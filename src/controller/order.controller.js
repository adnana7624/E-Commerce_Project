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
        
        // claculate amount 
        let total=0;
        cart.items.forEach(item =>{
            if(item.product){
                total += item.product.price*item.quantity;
            }
        });
       
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

        return res.status(200).json({message : "order create succesfull"})


    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}

export {placeOrder};