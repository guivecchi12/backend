const jwt = require('jsonwebtoken')

function restrict(){
    const authError = {
        message: "You are not permitted to enter"
    }

    return async(req, res, next) => {
        try{
            const token = req.cookies.token
            console.log(token)
            if(!token){
                return res.status(401).json(authError)
            }
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err){
                    return res.status(401).json(authError)
                }
                req.token = decoded
                console.log(req.token)
                if( !decoded.user_id){
                    return res.status(403).json(authError)
                }
                next()
            })
        }
        catch(err){
            next(err)
        }
    }
}

module.exports = restrict