const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/user/login', (req, res) => {
    res.render('user/login');
});

router.post('/user/login/check', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect:'/user/login',
    failureFlash: true
}));

router.get('/user/signup', (req, res) => {
    res.render('user/signup');
});

router.post('/user/signup/check', async (req, res) => {
    let {email, name, age, city, address, password, password_confirm} = req.body;

    if(password != password_confirm) {
        req.flash('error_msg', 'Las contraseñas no coiniden.');
        res.redirect('/user/signup');
    } else {
        let user = new User({
            name, email, age, city, address, password
        });

        user.password = await user.encrypt(password);
        

        user.save().then(() => {
            req.flash('success_msg', 'Registro exitoso');
            res.redirect('/user/login')
        }).catch(err => {
            if(err.code == 11000) req.flash('error_msg', 'Dirección de correo en uso.');
            else {
                console.error(err);
                req.flash('error_msg', 'Ocurrió un error inesperado');
            }
            res.redirect('/user/signup')
        });
    }
});

router.get('/user/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})


module.exports = router;