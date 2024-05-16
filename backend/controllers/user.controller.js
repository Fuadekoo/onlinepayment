import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// addnew user
const addNewUser = async (req, res) => {
    try {

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false,
                data: null
            });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            phonenumber: req.body.phonenumber,
            address: req.body.address,
        });
        await newUser.save();
        res.status(201).json({
            message: "User created successfully",
            success: true,
            data: null
        });
    } 
    catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
            data: null
        });
        console.log(error);
    }
}

// get login User Info
const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);


        res.status(200).json({
            message: "user info fetched successfully",
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
            data: null
        });
        console.log(error);
    }
}
export {addNewUser, getUserInfo};
