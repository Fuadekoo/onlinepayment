import express from 'express';
import Transaction from '../models/transactionModel.js';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const stripe = stripe(process.env.STRIPE_SECRET_KEY);

// transfer money from one another
const transfermoney = async (req, res) => {
    try{
        // save the transaction
        const newTransaction = new Transaction(req.body);
       await newTransaction.save();

    //    decreases the amount of the sender
    const sender = await User.findByIdAndUpdate(req.body.sender, {
        $inc: {balance: -req.body.amount},
    });

    // increases the amount of the receiver
    const receiver = await User.findByIdAndUpdate(req.body.receiver, {
        $inc: {balance: req.body.amount},
    
    });

    res.send({
        message: "Transaction successful",
        data: newTransaction,
        success: true,
        });


    }
    catch(error){
        res.status(500).json({
            message: error.message,
            success: false,
            data: error.message,
        });
    }
};

// verify receiver account number
const verifyAccountNumber = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.receiver });

        if (user) {
            res.send({
                message: "Account number verified successfully",
                success: true,
                data: user,
            });
        }
        else {
            res.send({
                message: "Account number not found",
                success: false,
                data: null,
            });
        }
    }
    catch(error){
        res.status(500).json({
            message: error.message,
            success: false,
            data: error.message,
        });
    }
};

// get all transactions for a user
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ 
            $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
        });

        res.send({
            message: "Transactions retrieved successfully",
            success: true,
            data: transactions,
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message,
            success: false,
            data: error.message,
        });
    }
};

// deposit funds using stripe
const depositFunds = async (req, res) => {
    try {
        // create a customer
        const customer = await stripe.customers.create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken,
        });
        
        // create a charge
        const charge = await stripe.charges.create({
            amount: req.body.amount,
            currency: 'usd',
            customer: customer.id,
            receipt_email: Token.email,
            description: 'Deposit funds to bank account',
        },
        {
            idempotencyKey: uuid(),
        }
    );

    // save the transaction
    if(charge.status === 'succeeded'){
        const newTransaction = new Transaction({
            sender: req.body.userId,
            receiver: req.body.userId,
            amount: req.body.amount,
            type: 'deposit',
            status: 'completed',
        });
        await newTransaction.save();

        // increase the amount of the user
        const user = await User.findByIdAndUpdate(req.body.userId, {
            $inc: {balance: req.body.amount},
        });
        res.send({
            message: "Funds deposited successfully",
            success: true,
            data: newTransaction,
        });
        
    }
    else {
        res.send({
            message: "Funds not deposited",
            success: false,
            data: null,
        });
    }

    }
    catch(error){
        res.status(500).json({
            message: error.message,
            success: false,
            data: error.message,
        });
    }};
    



export { transfermoney, verifyAccountNumber, getTransactions, depositFunds };