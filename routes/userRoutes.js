import { login,logout,signup,me } from "../Controller/usercontroller.js";
import Auth from "../config/Auth.js";
import express from "express"


const userRouter=express.Router()

userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.post("/",logout)
userRouter.get("/me",Auth,me)


export default userRouter