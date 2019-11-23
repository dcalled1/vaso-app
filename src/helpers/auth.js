let helper = {}

helper.inSession = (req, res, next) => {
    if(req.isAthenticated()) {
        return next()
    }
    req.flash('error_msg', 'No autorizado');
    res.redirect('/user/login');
}

module.exports = helper; 