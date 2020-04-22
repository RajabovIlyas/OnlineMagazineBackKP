const computer=require('../app/controllers/computers');
const auth=require('../app/controllers/auth');
const authMiddleware=require('../app/middleware/auth');
const user=require('../app/controllers/user');

module.exports=(app)=>{
    //Работа с компьютерами
    app.get('/computers_section',computer.getAll);
    app.get('/computers_section/:id',computer.getId);
    app.post('/computers_section',computer.create);
    app.put('/computers_section/:id',computer.update);
    app.delete('/computers_section/:id',computer.remove);

    //Вход
    app.post('/sign_in',auth.singIn);
    app.post('/refresh_tokens',auth.refreshTokens);

    //Работа с пользователями
    app.post('/registration',user.create);          //Регистрация
    app.get('/users',authMiddleware,user.getAll);
    app.get('/user/:id',authMiddleware,user.getId);
    app.put('/user/:id',authMiddleware,user.update);
    app.delete('/user/:id',authMiddleware,user.remove);
};