import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import notesRoutes from "./routes/notesRoutes";
import globalErrorHandler from "./middlewares/globalHandleError";
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require("../swagger.json");
import cors from "cors";

dotenv.config();

const app = express();
const { PORT, MONGODB_URL } = process.env;

mongoose
  .connect(MONGODB_URL!)
  .then(() => {
    console.log("Database connection successful");
    app.use(cors());
    app.use(bodyParser.json());

    // Routes
    app.use("/api", notesRoutes);

    app.use(globalErrorHandler);

    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Start the server
    app.listen(PORT || 3001, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1);
  });
