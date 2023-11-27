const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { userRoute } = require("./routes/UserRoute.js");
const { incomeRoute } = require("./routes/IncomeRoute.js");
const { expenseRoute } = require("./routes/ExpenseRoute.js");
const { savingRoute } = require("./routes/SavingRoute.js");
const { debtRoute } = require("./routes/DebtRoute.js");

dotenv.config();

const app = express();

const uri = process.env.MONGODB_URI;
mongoose.connect(uri);

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("database connected..."));

const corsOptions = {
  origin: ["https://saldo-siaga.vercel.app"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(userRoute);
app.use(incomeRoute);
app.use(expenseRoute);
app.use(savingRoute);
app.use(debtRoute);

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed.");
    process.exit(0);
  });
});

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  console.log(`Server up and running on port ${port}`)
);