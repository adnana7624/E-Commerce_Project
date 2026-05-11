import { uplaodOnCloudinary } from "../middleware/cloudinary.middleware.js";
import {Cart} from "../moddle/cart.model.js";


const addToCart = async(req , res) => {
    try {
        const userId = req.user.id;
        const{productId , quantity = 1 } = req.body;

        let cart = await Cart.findOne({user : userId})

        //check cart if not exist crreate
        
        if(!cart){
            cart = await Cart.create({
                user : userId,
                items : [{product : productId,quantity}]
            })
        }

        else {
            const index = cart.items.findIndex(
                item => item.product.toString() === productId
            );
        console.log("index:", index);

        if(index > -1){
            cart.items[index].quantity += Number(quantity)
        }
        else{
            cart.items.push({
                product : productId,
                quantity : Number(quantity)})
        }

        await cart.save();
    };
    

    return res.status(200).json({
        success : true,
        message : "product succesfully add to cart",
        cart
    });
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}

const getcart = async(req , res ) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({user : userId}).populate("items.product")
        
        return res.status(200).json({
            cart
        });

    } catch (error) {
        return res.status(500).json({message : error.message })
    }
}

const removeItemFromCart = async(req,res) => {
    try {
        const userId = req.user.id;
        const {productId} = req.body;
        
        const cart = await Cart.findOne({user : userId})

        if(!cart){
            return res.status(404).json({message:"item not found"})
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        )
        await cart.save();
        return res.status(200).json({
            message : "item removed",
        cart
    })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const updateQuantity = async(req,res) => {
    try {
        const userId = req.user.id;
        const{productId , quantity } = req.body;

        const cart = await Cart.findOne({user : userId})

        const item = cart.items.find(
            item => item.product.toString() === productId
        )

        if(!item ){
            return res.status(404).json({message : "item not found"})
        }

        item.quantity = quantity;

        await cart.save();
        return res.status(200).json({message : "quanitiy updated"})

    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}

export {
    addToCart,
    getcart,
    removeItemFromCart,
    updateQuantity
}