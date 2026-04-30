import { uplaodOnCloudinary } from "../middleware/cloudinary.middleware.js";
import {Product} from "../moddle/product.modle.js";

const createProduct = async(req , res) => {
    try {
        const {name , description , price , stock } = req.body;

        if(!name || !price ){
            return res.status(400).json({message : "product name , price and image are required"})
        }

        let image = "";
        if(req.file){
            image = await uplaodOnCloudinary(req.file.path)
            
        }

        const product = await Product.create({
            name,
            description,
            price,
            stock,
            productImage : image,
            createdBy : req.user.id 
        })
        return res.status(201).json({
            message : "product create successfulyy",
            product
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
    
}


const getProduct = async(req , res ) => {
    try {
        const products = await Product.find();

        return res.status(201).json({products})

    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}

const updateProduct = async(req,res) => {
    try {
        const {id} = req.params

        const product = Product.findById(id);

        if(!product){
            return res.status(404).json({message:"product not found"})
        }

        const updatedproduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            {new : true}
        )

        return res.status(200).json({
            message:"product update succesfully",
        updatedproduct})
        
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}



export {createProduct , getProduct}