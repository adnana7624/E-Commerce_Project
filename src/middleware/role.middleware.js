const isadmin = async(req , res , next)=>{
    try {
        if(req.user.role !=="admin"){
            return res.status(401).json({
                message : "acces denied : onluy admin allowed"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}
export {isadmin}