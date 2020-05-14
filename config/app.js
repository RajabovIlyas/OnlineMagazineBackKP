module.exports = {
    appPort: 5000,
    mongoUri: 'mongodb://localhost/shop_online',
    jwt: {
        secret: '5e7a2eb53b92a881e87b3a1b',
        tokens: {
            access: {
                type: 'access',
                expiresIn: '30m',
            },
            refresh: {
                type: 'refresh',
                expiresIn: '50m',
            },
        },
    },

};