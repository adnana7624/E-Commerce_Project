import express from "express";
import { signup , login } from "../controller/user.controllerr.js";
import {verifyjwt} from "../middleware/auth.middleware.js";
import {isadmin} from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/login", login);

router.get("/profile",verifyjwt,(req,res)=>{
    res.json({
        message : "user profile",
        user : req.user
    })
})

router.get("/admin",verifyjwt,isadmin ,(req,res) => {
    res.json({
        message : "admin profile "
    })
})

export {router};