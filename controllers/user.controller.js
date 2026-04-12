const UserModel = require('../models/user.model.js');
const Joi = require("joi");
const registerUser = async (req, res, next) => {
    const registerSchema = Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
    })
    const { error, value } = registerSchema.validate(req.body)
    if (error) {
        return res.status(400).json(error)
    }

    try {
        const newUser = new UserModel(value);
        await newUser.save();
        return res.status(200).json({
            message: "User created",
            data: newUser
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports = {
    registerUser,
}


