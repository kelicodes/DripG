import express from "express"
import Auth from "../config/Auth.js"
import { addtocart,removefromcart,getmyCart } from "../Controller/cartController.js"


const cartRouter=express.Router()

cartRouter.post("/addtocart",Auth,addtocart)
cartRouter.post("/removefromcart",Auth,removefromcart)
cartRouter.post("/mycart",Auth,getmyCart)


export default cartRouter