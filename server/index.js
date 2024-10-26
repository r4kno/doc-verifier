// Importing required modules
import express from "express";
import mongoose from "mongoose";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { fileURLToPath } from "url";
import multer from "multer";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import docRoutes from "./routes/docs.js";
import { register } from "./controllers/auth.js";
import { createDoc } from "./controllers/docs.js";
import { verifyToken } from "./middleware/auth.js";

// TODO adding file filter for specific file (multer)

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// load environment variables
dotenv.config();

// Creating an instance of express
const app = express();

// Using express.json to parse JSON request bodies
app.use(express.json());

// Using helmet to secure express app
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Using morgan to log HTTP requests
app.use(morgan("common"));

// Using body-parser to parse incoming request bodies
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Using cors to allow cross-origin requests
app.use(cors());

// Serve static assets
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
// Using multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// POST routes that require file upload
app.post("/auth/register", upload.single("picture"), register);
app.post("/docs", verifyToken, upload.single("picture"), createDoc);

// Using express router for the auth, user and doc routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/docs", docRoutes);

// Set the PORT environment variable or use 6001 as default
const PORT = process.env.PORT || 6001;

// Deployment
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "../client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "../client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

/* MONGOOSE SETUP */
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Running at ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));