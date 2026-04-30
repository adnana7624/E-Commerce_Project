import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : String,
    price : {
        type : Number,
        required : true
    },
    stock : {
        type : Number,
        default : 0
    },
    productImage : {
      type : String

    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
},{timestamps : true});

export const Product = mongoose.model("Product",productSchema)