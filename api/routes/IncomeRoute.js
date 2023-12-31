const express = require("express");
const router = express.Router();

const incomeController = require("../controllers/IncomeController"); // Adjust path as needed

router.post("/user/:userId/income/", incomeController.createIncome);
router.put("/user/:userId/income/:id", incomeController.updateIncome);
router.delete("/user/:userId/income/:id", incomeController.deleteIncome);

router.get("/user/:userId/income", incomeController.getIncomesByUser);
router.get("/user/:userId/income/id/:id", incomeController.getIncomeById);
router.get("/user/:userId/income/total", incomeController.getTotalIncomeByUser);
router.get(
  "/user/:userId/income/total/all/months",
  incomeController.getMonthlyIncomesByYear
);
router.get(
  "/user/:userId/income/category",
  incomeController.getIncomeByCategory
);
module.exports = router;
