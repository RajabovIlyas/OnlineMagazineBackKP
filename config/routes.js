const computer=require('../app/controllers/computers');
const auth=require('../app/controllers/auth');
const authMiddleware=require('../app/middleware/auth');
const user=require('../app/controllers/user');
const buy=require('../app/controllers/buyUser');
const basket=require('../app/controllers/addBasketUser');

module.exports=(app)=>{
    //Работа с компьютерами
    app.get('/computers_section',computer.getAll);
    app.get('/computers_section/:id',computer.getId);
    app.post('/computers_section',authMiddleware,computer.create);
    app.put('/computers_section/:id',authMiddleware,computer.update);
    app.delete('/computers_section/:id',authMiddleware,computer.remove);
    app.put('/computers_section/add_comment/:id',authMiddleware,computer.addComment);

    //Покупка продукции
    app.get('/buy',authMiddleware,buy.getAll);
    app.get('/buy/:id',authMiddleware,buy.getId);
    app.post('/buy',authMiddleware,buy.create);
    app.delete('/buy/:id',authMiddleware,buy.remove);

    //Работа с корзиной
    app.get('/basket',authMiddleware,basket.getAll);
    app.get('/basket/:id',authMiddleware,basket.getId);
    app.post('/basket',authMiddleware,basket.create);
    app.delete('/basket/:id',authMiddleware,basket.remove);
    app.delete('/basket/buy/:id',authMiddleware,basket.buyBasket);

    //Вход
    app.post('/sign_in',auth.singIn);
    app.post('/refresh_tokens',auth.refreshTokens);
    app.post('/logout',auth.logout);
    app.get('/auth/me',auth.authMe);

    //Работа с пользователями
    app.post('/registration',user.create);          //Регистрация
    app.get('/users',authMiddleware,user.getAll);
    app.get('/user/:id',authMiddleware,user.getId);
    app.put('/user/:id',authMiddleware,user.update);
    app.delete('/user/:id',authMiddleware,user.remove);
};