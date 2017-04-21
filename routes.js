module.exports = function(app, passport){
    //home page
    app.get('/', function(req, res){
        res.render('index.ejs');
    });

    //login page
    app.get('/login', function(req, res){
        //render page and flash data if any
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    //signup page
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
    //create credentials when req is posted
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    //profile section
    app.get('/profile', isLoggedIn, function(req, res) {
        //get user out of session and pass to template
        res.render('profile.ejs', { user : req.user });
    });

    //logout page
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
}

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/')
}