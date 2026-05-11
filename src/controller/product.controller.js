
import { uplaodOnCloudinary } from "../middleware/cloudinary.middleware.js";
import {Product} from "../moddle/product.modle.js";


const createProduct = async(req , res) => {
    try {
        const {name , description , price , stock  } = req.body;

        if(!name || !price || !stock ){
            return res.status(400).json({message : "all field are requied to add a product"})
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

        const {name , description , price , stock } = req.body

        // if user want to update one field like name or price or update all field

        const updatedata = {};
        if(name !== undefined) updatedata.name = name;
        if(description !== undefined) updatedata.description = description;
        if(price !== undefined) updatedata.price = price;
        if(stock !== undefined) updatedata.stock = stock;
        

        let image = Product.productImage;

        // if add new image
        if(req.file){
            const uploaded = await uplaodOnCloudinary(req.file.path)
            updatedata.productImage = uploaded.secure_url;
        }

        // this use to update all field at a time 
        // const updatedproduct = await Product.findByIdAndUpdate(
        //     id,
        //     {
        //         name,
        //         description,
        //         price,
        //         stock,
        //         productImage:image 

        //     },
        //     {new : true}
        //)

        const updatedproduct = await Product.findByIdAndUpdate(
            id,
            updatedata,
            {new : true}
        )
        
        return res.status(200).json({
            message:"product update succesfully",
        updatedproduct})
        
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}


const deleteProduct = async(req,res) => {
    try {
        const {id} = req.params;

        const product = await Product.findById(id)
        if(!product){
            res.status(404).json({message : "product not found"})
        }

        await Product.findByIdAndDelete(id);

        return res.status(200).json({
            message: " product deleted succesfully"
        })

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}



export {
    createProduct ,
    getProduct,
    updateProduct,
    deleteProduct
}
