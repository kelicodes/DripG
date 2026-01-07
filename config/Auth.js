import JWT from "jsonwebtoken";


 const Auth=()=>{
    try {
        const token= requestAnimationFrame.cookies.token

        if(!token){
            return res.status(401).json({
                success:false,
                message:"log in required"
            })
        }

        const decoded= JWT.verify(token,process.env.SECRETKEY)

        req.user=decoded

        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"user requted to login first"})
    }
}



export default Auth