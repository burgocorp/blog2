const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data){

    let errors = [];

    //삼항 연산 조건식 ?참 :거짓

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (validator.isEmpty(data.email)){
        errors.email = 'email field is required';

    }
    if (!validator.isEmail(data.email)){
        errors.email = 'Email is invalid';
    }

    if(validator.isEmpty(data.password)){
        errors.password = 'password field is required';
    }

    return {
        errors,
        isValid : isEmpty(errors)
    };
};