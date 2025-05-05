import mongoose from "mongoose";
import userData from "../model/userModel.js";
import bcrypt from "bcryptjs";  


export const singUp = async(req, res) => {

    try{
        const {name, email, password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({message: "Please fill all the fields"})
        }


        // emial validatiaon
        if(!email.includes("@") && !email.includes(".com")){
            return res.status(400).json({message: "Please enter a valid email"})
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({message: "Please enter a valid email"})
        }

        // password validation
        if(password.length < 8){
            return res.status(400).json({message: "Password must be at least 6 characters"})
        }


        // check if user already exists
        const userExists = await userData.findone({email})
        if(userExists){
            return res.status(400).json({message: "User already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)


        const newuser = new userData({
            name,
            email,
            password: hashedPassword
        })

        await newuser.save()
        res.status(201).json({message: "User created successfully"})
    }catch(err){
        console.log(err)
        res.status(500).json({message: "Internal server error"})
    }
}
