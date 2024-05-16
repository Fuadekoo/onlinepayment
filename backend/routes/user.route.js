import express from 'express';
import {addNewUser,getUserInfo} from '../controllers/user.controller.js';//  Assuming you have a add new user controller defined
import authMiddleware from '../middlewares/authMiddleware.js';
const router=express.Router();



// Register new user
router.post("/signup", addNewUser);

// Get user info
router.get("/get-user-info",authMiddleware, getUserInfo);





export default router;
