import { login,logout,signup } from "../Controller/usercontroller.js";
import express from "express"


const userRouter=express.Router()

userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.post("/",logout)


export default userRouter