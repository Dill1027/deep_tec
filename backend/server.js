const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mernmobileapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connection established successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes will be added here

const port = process.env.PORT || 5000;

// Improved server startup with error handling
const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use. Please try these steps:`);
      console.error('1. Stop any other servers that might be running');
      console.error(`2. Run: lsof -i :${port} to see which process is using the port`);
      console.error(`3. Kill the process using: kill -9 <PID>`);
      console.error('4. Or try using a different port by setting PORT in .env file');
    } else {
      console.error('Error starting server:', error);
    }
    process.exit(1);
  }
};

startServer();
