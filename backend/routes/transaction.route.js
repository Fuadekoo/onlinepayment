import express from 'express';
import { transfermoney, verifyAccountNumber,getTransactions,depositFunds } from '../controllers/transaction.controller.js';

import authMiddleware from '../middlewares/authMiddleware.js';
const router=express.Router();



// transfer money from one another
router.post("/transferMoney",authMiddleware, transfermoney);

// verify receiver account number
router.post("/verifyAccountNumber",authMiddleware, verifyAccountNumber);

// get all transaction for a user
router.post("/get-all-transaction-by-user",authMiddleware, getTransactions);

// deposit the fund using stripe
router.post("/deposit",authMiddleware, depositFunds);


export default router;
