const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userService = require('../services/userService.js')

// passport.use(new LocalStrategy(
//     function (username, password, done) {
//         console.log('before getByUserName');
//         userService.getByUserName(username)
//             .then(user => {
//                 if (!user) {
//                     return done(null, false, { message: 'No such username' });
//                 }
//                 if (user.password !== password) {
//                     return done(null, false, { message: 'Incorrect password.' });
//                 }
//                 return done(null, user);
//             }).catch(err => {
//                 return done(err);
//             })
//     }
// ));

function addAuthRoutes(app, passport) {
    app.post('/login',
        passport.authenticate('local', { 
                                   failureRedirect: '/#/login?faliure=falure'
                                  }),

        function (req, res) {
            // var credentials = req.body.credentials;
            // console.log('This is auth-routes an athentication', credentials)
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            // res.redirect('/users/' + req.user.username);
            res.redirect('/#/user/' + req.user.userName);

        })
}


    // router.get('/login', (req, res) =>{
    //     res.render('login');
    // })

    // router.get('/logout', (req, res) =>{
    //     //handle with passport
    //     res.send("logging out");
    // })

    // router.get('/google', (req, res) =>{
    //     //handle with passport
    //     res.send("logging in with google");
    // })

module.exports = addAuthRoutes;