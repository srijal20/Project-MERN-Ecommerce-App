import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import path,{dirname} from "path";
import { fileURLToPath } from "url";

dotenv.config(); //if file is not in root then delclare its inside config

//databsase config
connectDB();

//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./Client/build/index.html"));
});

app.use(express.static(path.join(__dirname, "./Client/build")));
//Port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} `.bgCyan
      .white
  );
});
