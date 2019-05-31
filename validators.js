const yup = require('yup');


const loginScheme = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().matches(/\w{6,}$/).required()
});

const userScheme = yup.object().shape({
    username: yup.string().min(2).required(),
    email: yup.string().email().required(),
    password: yup.string().matches(/\w{6,}$/).required()
});


const validateLogin = async user => {
    return await loginScheme.isValid(user);
}


const validateNewUser = async user => {
    return await userScheme.isValid(user);
}

module.exports = {
    validateLogin,
    validateNewUser
}