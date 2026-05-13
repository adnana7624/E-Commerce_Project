import { Order } from "../moddle/order.model.js";
import { Cart } from "../moddle/cart.model.js";
import { Product } from "../moddle/product.modle.js";

const placeOrder = async(req,res)=>{
    try {
        const userId = req.user.id;
        const {shippingaddress} = req.body;

        const cart = await Cart.findOne({user:userId}).populate("items.product");

        if(!cart || cart.items.length === 0){
            return res.status(400).json({message:"cart is empty"})
        }
        
        cart.items = cart.items.filter(item => item.product);

        await cart.save();
        
        // claculate amount 
        let total=0;
        cart.items.forEach(item =>{
            if(item.product){
                total += item.product.price*item.quantity;
            }
        });
        

        // validate stock 
        for(let item of cart.items){
            // skip if ivalid product foiind

            if(!item.product) continue;

            
        }


        // create order
        const order = await Order.create({
            user : userId,
            items : cart.items.filter(item => item.product).map(item=>({
                product : item.product._id,
                quantity : item.quantity
            })),
            totalamount : total,
            shippingaddress
        })

        for(let item of cart.items){
            if (!item.product) continue;

            await Product.findByIdAndUpdate(
                item.product._id,
                {$inc : {stock : -item.quantity}}
            )
        }
        
        cart.items = [];
        await cart.save();

        await order.populate("items.product")

        return res.status(200).json({
            success : true,
            message : "order create successfull",
            order
        })


    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}


const getOrder = async(req,res) =>{
    try {
        const order = await Order.find();

        return res.status(200).json({order })
        
    } catch (error) {
        return res.status(500).json({
            succes : false,
            message : error.message
        })
    }
}

const updateOrderStatus = async(req,res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // check order hai or not

        const order = await Order.findById(id);
        if(!order){
            return res.status(404).json({message : "there have no order to update its status"})
        }

        order.status = status;
        await order.save();

        return res.status(200).json({
            succes : true,
            message : "order status updated",
            order
        })

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}
export {placeOrder , getOrder , updateOrderStatus};