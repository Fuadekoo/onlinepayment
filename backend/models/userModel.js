import mongoose from "mongoose"
import dotenv from 'dotenv';
// create a user schema

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    phonenumber: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    }
    

});

const User = mongoose.model('User', userSchema);

export default User;
