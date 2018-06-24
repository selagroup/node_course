const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const users = [
    {username:'niro', email:'nirn@sela.co.il', password:'123456'}
]

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    function (email, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        
        let user = users.find((user) => user.email == email && user.password == password);
        if (!user) {
            return cb(null, false, {message: 'Incorrect email or password.'});
        }
        return cb(null, user, {message: 'Logged In Successfully'});

    }
));