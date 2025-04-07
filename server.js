const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const todoRoutes = require('./routes/todoRoutes');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/todos', todoRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Todo API' });
});

// Error handler
app.use(errorHandler);

// Start server
const PORT = 5001; // Test with this // Changed from 5001 to 5001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


console.log("Using PORT:", process.env.PORT); // Should log 5001
console.log("Using MONGO_URI:", process.env.MONGO_URI ? "Loaded" : "Missing");