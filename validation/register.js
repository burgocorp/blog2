const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {

    let errors = {};

    //삼항 연산조건식 ?참 :거짓
    data.username = !isEmpty(data.username) ? data.username : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if(!validator.isLength(data.username, {min :2, max : 30})){
        errors.username = 'Name must be between 2 and 30 characters';
    }

    if(validator.isEmpty(data.username)){
        errors.username = 'Name field is required';
    }

    if(validator.isEmpty(data.email)){
        errors.email = 'email field is required';
    }

    if(validator.isEmpty(data.password)){
        errors.password = 'password field is required';
    }

    if(validator.isEmpty(data.password2)){
        errors.password2 = 'confirm password field is required';
    }

    if(!validator.isEmail(data.email)){
        errors.email = 'Email is invalid';
    }

    if(!validator.isLength(data.password, {min : 8, max : 12})){
        errors.password = 'password must be between 9 and 12 characters';
    }

    if(!validator.equals(data.password, data.password2)){
        errors.password2 = 'passwords must match';
    }

    return {
        errors,
        isValid : isEmpty(errors)
    };


};