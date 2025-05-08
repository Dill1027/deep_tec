const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mernmobileapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connection established successfully');

    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    }).on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`\nError: Port ${port} is already in use.`);
        console.error('\nTry these solutions:');
        console.error(`1. Kill the process using port ${port}:`);
        console.error(`   - Run: lsof -i :${port}`);
        console.error('   - Note the PID and run: kill -9 <PID>');
        console.error('\n2. Or use a different port:');
        console.error('   - Set a different PORT in .env file');
        console.error('   - Or run with a different port: PORT=5001 npm run dev\n');
        process.exit(1);
      }
      throw error;
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
