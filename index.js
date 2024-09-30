require('dotenv').config();
const express = require('express');
const router = require('./routes/Student.route');
const app = express();
const passport = require('passport')
const session = require('express-session')
const adminRouter = require('./routes/Auth.route')
const PORT = process.env.PORT || 3000;
const flash = require('connect-flash')

app.use(express.json());
app.use(flash())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))


// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


app.use('/api', router);
app.use('/auth', adminRouter)
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});