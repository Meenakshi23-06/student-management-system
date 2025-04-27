const express = require('express');
const { connectDB } = require('./models/db');
const studentRoutes = require('./routes/students');
const courseRoutes = require('./routes/courses');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);

async function startServer() {
  try {
    await connectDB();
    
    // Create indexes
    const db = require('./models/db').getDB();
    await db.collection('students').createIndex({ email: 1 }, { unique: true });
    await db.collection('courses').createIndex({ courseName: 'text' });
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
