const { StatusCodes } = require('http-status-codes');
 
const AuthService = require('../services/authService');
const AuthRepository = require('../repositories/authRepository');
const generateTokenAndSetCookie = require('../utils/tokenGenerator');

const authService = new AuthService(new AuthRepository());

async function signUp(req, res, next) {
    try {
        const newUser = await authService.signUpUser(req.body);
        
        // Generating a JWT token
        generateTokenAndSetCookie(newUser._id, res); 

        return res.status(StatusCodes.CREATED).json(newUser);
    } catch (error) {
        next(error);
    }
}

async function logIn(req, res, next) {
    try {
        const loginUser = await authService.logInUser(req.body);

        // generating JWT token
        generateTokenAndSetCookie(loginUser._id, res);

        return res.status(StatusCodes.ACCEPTED).json(loginUser);
    } catch (error) {
        next(error);
    }
}

async function logOut(req, res, next) {
    try {
        const logoutUser = await authService.logOutUser();

        res.cookie("jwt", "", { maxAge: 0 });

        res.status(StatusCodes.ACCEPTED).json(logoutUser);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    signUp,
    logIn,
    logOut
};