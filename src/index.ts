import express from 'express';
import bodyParser from 'body-parser';
import notesRoutes from './routes/notesRoutes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const { PORT, MONGODB_URL } = process.env

mongoose
.connect(MONGODB_URL!)
  .then(() => {
  console.log("Database connection successful");
  app.use(bodyParser.json());
    
  // Routes
  app.use('/api', notesRoutes);
    
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error('Failed to connect to the database:', error.message);
  process.exit(1);
});
