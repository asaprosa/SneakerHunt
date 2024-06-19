function checkPassword(password, confirmPassword) {
    if(password !== confirmPassword) {
        return false;
    } else {
        return true;
    }
}

module.exports = checkPassword;