const User = require('../models/userModel');
const ConflictError = require('../errors/conflict');
const NotFoundError = require('../errors/notFound');

class AuthRepository {
    async signUpUser(userData) {
        try {
            const { userName, email, password } = userData;

            const user = await User.findOne({ userName });

            if(user) {
                throw new ConflictError("User", 'Username', userName); // if user already present
            }

            const newUser = await User.create({
                userName: userName,
                email: email,
                password: password,
            });

            await newUser.save();

            const newUserResponse = {
                _id: newUser._id,
                userName: newUser.userName,
                email: newUser.email
            };

            return newUserResponse;
        } catch (error) {
            throw error;
        }
    }

    async logInUser(userData) {
        try {
            const { userName, password } = userData;

            const user = await User.findOne({ userName });

            if(!user) { // if user of entered UserName is not found
                throw new NotFoundError("User", userName);
            }

            return user;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = AuthRepository;