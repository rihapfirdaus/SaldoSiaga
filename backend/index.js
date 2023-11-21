import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import IncomeRoute from "./routes/IncomeRoute.js";
import ExpenseRoute from "./routes/ExpenseRoute.js";
import DebtRoute from "./routes/DebtRoute.js";
import SavingRoute from "./routes/SavingRoute.js";

dotenv.config();

const uri = process.env.MONGODB_URI;
const app = express();
mongoose.connect(uri);

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("database connected..."));

app.use(cors());
app.use(express.json());

app.use(UserRoute);
app.use(IncomeRoute);
app.use(ExpenseRoute);
app.use(DebtRoute);
app.use(SavingRoute);

app.listen(5000, () => console.log("Server up and running"));
