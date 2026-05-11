import {User} from "../moddle/user.moddle.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const signup = async(req , res) => {
    try {
        const {name , email , password } = req.body;

        if(!name || !email || !password){
            return res.status(403).json({message : "all field are required"})
        }

        const exist = await User.findOne({email})
        if(exist){
            return res.status(400).json({message : "User already registered "})
        }

        const hash = await bcrypt.hash(password,10)
        
        const user = await User.create({
            name,
            email,
            password:hash
        })

        return res.status(201).
        json({message : "User Registered successfully"})

    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}

const login = async(req , res ) => {
    try {
        const { email , password } = req.body

        const user = await User.findOne({email})

        if(!user){
            return res.status(403).json({
                message:"user nor found"
            })
        }

        const ismatch = await bcrypt.compare(password,user.password)
        if(!ismatch){
        return res.status(401).json({
            message: "invalid credentials"
        })
}

        const token = jwt.sign({
            id : user._id,
            role : user.role},
            process.env.JWT_SECRET,
            {expiresIn : "20d"}
        )
        res.status(201).json({
            success : true,
            message : "user logedIn sucessfully",
            token : token
        })
    } catch (error) {
        res.status(500).json({
            message : error.message,
            
        })
    }

}

export {signup,login}