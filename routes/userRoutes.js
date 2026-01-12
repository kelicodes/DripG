import { login,logout,signup,me } from "../Controller/usercontroller.js";
import express from "express"


const userRouter=express.Router()

userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.post("/",logout)
userRouter.get("/me",me)


export default userRouter