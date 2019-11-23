const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new Strategy({
    usernameField: 'email'
}, async (email, password, done) => {
    let user = await User.findOne({email: email})
    if(!user) {
        return done(null, false, {message: 'El usuario no existe'})
    } else {
        let match = await user.match(password);
        if(match) return done(null, user); 
        else return done(null, false, {message: 'Contraseña Incorrecta'})
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
