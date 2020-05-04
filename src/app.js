import express  from "express";
import morgan from "morgan";
import bodyParser  from "body-parser";
import cors from "cors";

import prdRoutes from "./routes/index";
const app = express();

app.use(cors());
app.use(morgan("dev"));
// Body Parser configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/", prdRoutes);
export default app;