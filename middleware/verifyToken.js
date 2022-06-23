const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) =>{

    try {
        const {authorization}= req.headers;

        if(!authorization){
            return res.status(401).json({
            success: false,
            message: 'token invalido'
            });
        }
           const token = authorization.split(' ')[1]; 

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if(!decoded){
                return res.status(400).json({
                    success: false,
                    message: 'token invalido'

                })

            }
            req.user_id = decoded.user_id;
            req.user_role = decoded.user_role;
            // console.log(decoded);
            next();
    } catch (error) {
        
        return res.status(500).json(
            { 
            success: false,
            message: 'invalid token',
            error: error?.message|| error
        })
    }



    // if(!req.headers?.authoritation){
    //     return res.send('token invalid');
    // }

    // next()
}

module.exports = verifyToken;