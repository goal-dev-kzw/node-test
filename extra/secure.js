require('dotenv').config();   //dotenv config from .env file
let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),   // get form urlencoded data
    passport = require('passport'),         // get token and make sucure route
    jwt = require('jsonwebtoken'),			// generate json web token
    JwtStrategy = require('passport-jwt').Strategy,     // get token and make sucure route  
    ExtractJwt = require('passport-jwt').ExtractJwt; // get token and make sucure route

// **** codes for passport-jwt ****//
let opts = {}                                   
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();  //declare type of token (bearer token)
opts.secretOrKey = process.env.SECRET;                    // secret key from .env file
// **** codes for passport-jwt ****//


// map object instead of database//
let userMap = new Map();
userMap.set('aa@gmail.com', { name: 'aa', email: 'aa@gmail.com', pass: '123' });
userMap.set('bb@gmail.com', { name: 'bb', email: 'bb@gmail.com', pass: '123' });
//map object instead of database//

//codes for passport-jwt//
let myStrategy = new JwtStrategy(opts, function (payload, done) {   //jwt strategy object
    let user = userMap.get(payload.email);  //check in map object user with payload.email from login route ****this***** 
    if (user != null || user != undefined) {     //if user is not(is not include in Map object) or (is not)undefined
        done(null, user);          //done(error,data)  error is null .. return data is user
    } else {
        done('No user with that email', null);  //done(error,data)   error is no user with that email... return data is null
    }
});// codes for passport-jwt //

passport.use(myStrategy);   //codes for passport // declare that you want to use myStrategy above the jwt-strategy object


//codes for body-parser//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//codes for body-parser//




app.post('/login', (req, res) => {
    let email = req.body.email;   // get from form data
    let pass = req.body.password;  //get from form data
    let user = userMap.get(email);       //check in userMap with email that u get from form data (instead of database)
    if (user != null || user != undefined) {    //if user is not (is not include in map object ) or is not(undefined)
        if (user.pass == pass) {             //user.pass is the data from map object now and pass is form data
            let payload = { email: email };      //  **** check with this in myStrategy Object*****     
            let token = jwt.sign(payload, process.env.SECRET);   // jwt generate token (payload and secret key combined and hash and then return a json web token)
            res.json({ token: token });     
        } else {
            res.send({ data: 'Password Error!' })
        }
    } else {
        res.send({ data: 'Email Error!' })
    }



});

app.get('/free', (req, res) => {
    res.send({ data: 'free route heehe!' });
});

app.get('/secret', passport.authenticate('jwt', { session: false }), (req, res) => { //just only put that you want for secure route //passport.authenticate('jwt', { session: false })  
    res.send({ data: 'Secret data for member!' }); 
})

app.listen(process.env.PORT);