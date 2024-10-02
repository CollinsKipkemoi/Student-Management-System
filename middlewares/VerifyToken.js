const checkToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        req.token = bearer[1]
        // console.log('Token verified');
        next();
    } else {
        res.status(403).json({
            message: 'Forbidden'
        });
    }
}

module.exports = checkToken