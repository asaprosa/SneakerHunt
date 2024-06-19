const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY, NODE_ENV } = require('../configs/serverConfig');

function generateTokenAndSetCookie(userId, res) {
    const token = jwt.sign({ userId }, JWT_SECRET_KEY, {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // milliseconds conversion
        httpOnly: true, // preven XSS attacks
        sameSite: "strict", // prevent CSRF attacks
        secure: NODE_ENV !== "development",
    });
};

module.exports = generateTokenAndSetCookie;