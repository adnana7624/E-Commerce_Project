import mongoose from "mongoose";
import { Product } from "../moddle/product.modle.js";

const cartSchema = new mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true
    },
    items : [
        {
            product : {
                type : mongoose.Types.ObjectId,
                ref : "Product"
            },
            quantity : {
                type : Number,
                default : 1
            }
        }
    ]
},{timestaps : true});

export const Cart = mongoose.model("Cart" , cartSchema)
