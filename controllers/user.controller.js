const bcrypt = require('bcryptjs');
const UserModel = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
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
        value.password = await bcrypt.hash(value.password, 12);
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

const loginUser = async (req, res, next) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
    });

    const { error, value } = loginSchema.validate(req.body)
    if (error) {
        return res.status(400).json(error)
    }

    try {
        const user = await UserModel.findOne({
            email : value.email,
        });
        if(!user) return res.status(404).json({
            error : "credentials invalid"
        });
        
        const compares = await bcrypt.compare(value.password, user.password); // true
        if (!compares) return res.status(404).json({
            error : "credentials invalid"
        });        

        const token = jwt.sign({
            userId : user._id, 
        },
        process.env.JWT_SECRET
    );

    return res.json({
        token
    })
    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = {
    registerUser, loginUser
}


