const passport = require('passport');
const {checkEmailExists, studentById} = require('../queries/Queries')
const pool = require('../db')
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'neptune'}, async (username, password, done) => {
    try {
        console.log('Checking user ')
        console.log('Username: ', username)
        console.log('Password: ', password)

        const userResult = await pool.query(checkEmailExists, [username]);
        if (userResult.rows.length > 0) {
            const user = userResult.rows[0];
            console.log(user)
            if (user.neptune_id === password && password === "admin") {
                return done(null, user);
            } else if (user.neptune_id === password && password !== "admin"){
                return done(null, false, {message: 'You are not an admin'});
            } else {
                console.log('User not found')
                return done(null, false, {message: 'Incorrect neptune id'});
            }
        } else {
            return done(null, false, {message: 'No user with that email'});
        }
    } catch (err) {
        return done(err);
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
    console.log('Serializing user')
})

passport.deserializeUser((id, done) => {
    const user = pool.query(studentById, [id])
    done(null, user)
})

module.exports = passport
