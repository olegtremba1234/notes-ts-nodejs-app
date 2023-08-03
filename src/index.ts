import express from 'express';
import bodyParser from 'body-parser';
import notesRoutes from './routes/notesRoutes';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Routes
app.use('/', notesRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
