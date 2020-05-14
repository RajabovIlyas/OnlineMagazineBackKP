const mongoose = require('mongoose');
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authHelper = require('../helpers/authHelper');
const {secret} = require('../../config/app').jwt;

const User = mongoose.model('Users');
const Token = mongoose.model('Token');

const updateTokens = (userId) => {
    const accessToken = authHelper.generateAccessToken(userId);
    const refreshToken = authHelper.generateRefreshToken();
    authHelper.replaceDbRefreshToken(refreshToken.id, userId);
    return {
        accessToken,
        refreshToken: refreshToken.token
    };
};

const singIn = (req, res) => {
    const {email, password} = req.body;
    User.findOne({email})
        .exec()
        .then(user => {
            if (!user) {
                res.status(401).json({message: 'Такого пользователя нет'});
                return;
            }
            if (password === user.password) {
                res.json(updateTokens(user._id));
            } else {
                res.status(401).json({message: 'Неправильный пароль'});
            }
        }).catch(err => {
        res.status(500).json({message: err.message});
    })
};


const refreshTokens = (req, res) => {
    const {refreshToken} = req.body;
    let payload;
    try {
        payload = jwt.verify(refreshToken, secret);
        if (payload.type !== 'refresh') {
            res.status(400).json({message: 'Недейстивтельный токен'});
            return;
        }
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            res.status(400).json({message: e.message});
            return;
        } else if (e instanceof jwt.JsonWebTokenError) {
            res.status(400).json({message: e.message});
            return;
        }
    }
    Token.findOne({tokenId: payload.id})
        .exec()
        .then(token => {
            if (token == null) {
                throw new Error('Токен не действителен');
            }
            return updateTokens(token.userId);
        })
        .then(tokens => res.json(tokens))
        .catch(err => res.status(400).json({message: res.message}));
};

const logout = (req, res) => {
    const {accessToken}  = req.body;
    if (!accessToken) {
        res.status(401).json({message: 'Токен не представлен!'});
        return;
    }
    let payload;
    try {
         payload = jwt.verify(accessToken, secret);

    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            res.status(200).json({message: e.message});
            return;
        } else if (e instanceof jwt.JsonWebTokenError) {
            res.status(200).json({message: e.message});
            return;
        }
    }
    Token.findOneAndDelete(payload.userId)
        .exec()
        .then(token => {
            if (token == null) {
                throw new Error('Токен не действителен');
            }
        })
        .then(tokens => res.status(200).json({message: 'Юзер успешно вышел'}))
        .catch(err => res.status(200).json({message: res.message}));
};

const authMe = (req, res) => {
    const {accessToken} = req.query;
    let payload;
    try {
        payload = jwt.verify(accessToken, secret);
        if (payload.type !== 'access') {
            res.status(401).json({message: 'Токен не действителен!'});
            return;
        }
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            res.status(401).json({message: 'Токен истек!'});
            return;
        } else if (e instanceof jwt.JsonWebTokenError) {
            res.status(401).json({message: 'Токен не действителен!'});
            return;
        }
    }
    User.findById(payload.userId)
        .exec()
        .then(user => {
            if (user === undefined) {
                throw new Error('Пользователь не действителен');
            }
            res.json({name:user.name, surname:user.surname, address:user.address,_id:user._id});
        }).catch(err => res.status(400).json({message: res.message}));
};


module.exports = {
    singIn,
    refreshTokens,
    logout,
    authMe,
};