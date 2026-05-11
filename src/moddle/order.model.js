import mongoose from "mongoose";
import { Product } from "./product.modle.js";

const orderSchema = new mongoose.Schema({
    user : {
        type: mongoose.Types.ObjectId,
        ref : "User",
        required : true
    },
    items : [
        {
            product : {
                type : mongoose.Types.ObjectId,
                ref : "Product"
            },
            quantity: {
                type : Number,
                required : true
            }
        }
    ],
    totalamount:{
        type : Number,
        required : true
    },
    shippingaddress : {
        type : String,
        required : true
    },
    paymentmethod:{
        type : String,
        default : "COD"
    },
    status : {
        type : String,
        enum : ["pending","shiped","deliverd"],
        default : "pending"
    }
},{timestamps : true})

export const Order = mongoose.model("Order" , orderSchema)