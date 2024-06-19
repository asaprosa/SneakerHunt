const bcrypt = require('bcryptjs');

const checkPassword = require('../validators/checkPassword');
const BadRequestError = require('../errors/badRequest');
const encryptPassword = require('../utils/hashPassword');

class AuthService {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }

    async signUpUser(userData) {
        const { userName, email, password, confirmPassword } = userData;

        const checkValidPassword = checkPassword(password, confirmPassword); // checking if both are same

        if(!checkValidPassword) {
            throw new BadRequestError('confirmPassword', "Confirm password is not same as Password!");
        }

        const hashedPassword = await encryptPassword(password); // hashing the password before storing

        const newUser = {};
        newUser.userName = userName;
        newUser.email = email;
        newUser.password = hashedPassword;

        const registeredUser = await this.authRepository.signUpUser(newUser);
        return registeredUser;
    }

    async logInUser(userData) {
        const { password } = userData;

        const user = await this.authRepository.logInUser(userData); // taking the userdata from repo

        // checking if the entered password is correct or not
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!isPasswordCorrect) {
            throw new BadRequestError('Username / Password', "Username or Password is incorrect!");
        }

        const loginUserData = {
            _id: user._id,
            userName: user.userName,
            email: user.email,
        };

        return loginUserData;
    }

    async logOutUser() {
        const logOutUser = {
            success: true,
            message: "User logged out successfully"
        };

        return logOutUser;
    }
};

module.exports = AuthService;