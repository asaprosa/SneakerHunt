async function signUp(req, res, next) {
    return res.status(201).json({
        message: "Signed Up",
    });
}

async function logIn(req, res, next) {
    return res.status(201).json({
        message: "User Loggd In",
    });
}

async function logOut(req, res, next) {
    return res.status(201).json({
        message: "User Loggd Out",
    });
}

module.exports = {
    signUp,
    logIn,
    logOut,
}
