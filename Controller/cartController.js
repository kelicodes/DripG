import axios from "axios";
import Cart from "../models/cartModel.js";
import User from "../models/userModel.js"


export const addtocart=async(req,res)=>{
    try {
        const userId=req.user.id

        const {productId, quantity}=req.body

        if(!productId || quantity < 1){
            return res.status(400).json({success:false,message:"error in add o cart controller"})
        }

        let cart= await Cart.findOne({userId})

        if(!cart){
            cart= new Cart({
                items:[{productId, quantity}],
                userId
            })
        }else{
              const itemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // Product exists → increase quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Product does not exist → add new item
        cart.items.push({ productId, quantity });
      }
        }

        await cart.save()

        res.status(200).json({success:true,message:"Product added to cart"})
        
    } catch (error) {
        console.log(error)
    return res.status(500).json({success:false,message:"error in add to cart"})
    }
}



export const removefromcart=async(req,res)=>{
    try {
        const userId=req.user.id

        const {productId}=req.body

        if(!productId ){
            return res.status(400).json({success:false,message:"error in remove from cart cart controller"})
        }

        let cart= await Cart.findOne({userId})


        if(!cart){
            return res.status(404).json({
                success:false,
                message:"no cart"
            })
        }


        cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );

        
        await cart.save()

        res.status(200).json({success:true,message:"Product removed from cart"})
        
    } catch (error) {
        console.log(error)
    return res.status(500).json({success:false,message:"error in remove from cart"})
    }
}


export const getmyCart=async(req,res)=>{
    try {
        const userId=req.user.id
    let response= await Cart.findOne({userId})

    if(response){
        return res.status(200).json({success:true,message:"cart fetched",response})
    }else{
                return res.status(401).json({success:false,message:"cart fecthing failed"})
    }
    } catch (error) {
        console.log(error)
        return res.status(401).json({success:false,message:"cart fecthing failed"})
    }

}


