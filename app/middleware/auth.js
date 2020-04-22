const jwt=require('jsonwebtoken');
const {secret} = require('../../config/app').jwt;

module.exports=(req,res,next)=>{
    const authHeader=req.get('Authorization');
    if(!authHeader){
        res.status(401).json({message: 'Токен не представлен!'});
        return;
    }
    const token=authHeader.replace('Bearer ','');
    try {
        const payload=jwt.verify(token,secret);
        console.log(payload);
        if(payload.type!=='access'){
            res.status(401).json({message: 'Токен не действителен!'});
            return;
        }
    }catch (e) {
        if(e instanceof jwt.TokenExpiredError){
            res.status(401).json({message: 'Токен истек!'});
            return;
        }else if(e instanceof jwt.JsonWebTokenError){
            res.status(401).json({message: 'Токен не действителен!'});
            return;
        }
    }
    next();
};