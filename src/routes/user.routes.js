import express from "express";
import { signup , login } from "../controller/user.controllerr.js";
import {verifyjwt} from "../middleware/auth.middleware.js";
import {isadmin} from "../middleware/role.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import {
    createProduct ,
    getProduct, 
    updateProduct, 
    deleteProduct    
} from "../controller/product.controller.js";

import {addToCart,
    removeItemFromCart,
    updateQuantity,
    getcart} from "../controller/cart.controller.js";

import { placeOrder } from "../controller/order.controller.js";

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
        message : "welcome to admin dashboard "
    })
})

router.post("/create",verifyjwt,isadmin,upload.single("productImage"),createProduct);

router.get("/getproduct",getProduct)

router.post("/update/:id",verifyjwt,isadmin,upload.single("productImage"),updateProduct)

router.delete("/delete/:id",verifyjwt,isadmin,deleteProduct)

router.post("/add",verifyjwt,isadmin,addToCart)
router.get("/getcart",verifyjwt,isadmin,getcart)
router.put("/updatequantity",verifyjwt,isadmin,updateQuantity)
router.delete("/deleteitem",verifyjwt,isadmin,removeItemFromCart)

router.post("/placeorder",verifyjwt,placeOrder)

export {router};