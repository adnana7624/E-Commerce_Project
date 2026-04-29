import jwt from "jsonwebtoken";

const verifyjwt = async(req , res , next ) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader){
            return res.status(201).json({
                message:"no token prodvided"
            })
        }
        const token = authHeader.split(" ")[1];
        if(!token){
            message : "token mising"
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}
export {verifyjwt}