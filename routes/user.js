const express = require('express');

const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user');
const validateRegisterInput = require('../validation/register');





//user register 1.email check 2. create avatar 3. usermodel 4.password encryption 5. response
router.post('/register', (req,res ) => {

    const {errors, isValid} = validateRegisterInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }

    userModel
        .findOne({email : req.body.email})
        .exec()
        .then(user => {
            if (user){
                return res.json({
                    msg : 'mail exists'
                });
            }else{

                const avatar = gravatar.url(req.body.email, {
                    s: '200', //size
                    r: 'pg', //rating
                    d: 'mm' //default
                });

                const user = new userModel({
                    name : req.body.username,
                    email : req.body.email,
                    password : req.body.password,
                    avatar : avatar
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(user.password, salt, (err, hash)=> {
                        if (err) throw err;
                        user.password = hash;
                        user
                        .save()
                        .then(result => {
                            res.json({
                                msg : 'registered user',
                                userInfo : result
                            });
                        })
                        .catch(err => {
                            res.json({
                                msg : err.message
                            });
                        });
                    })
                })
            }
        })
        .catch(err => {
            res.json({
                msg : err.message
            });
        });

});

//user login 1.email check 2.password check(decoding) 3. returning jwt 4. response
router.post('/login', (req,res) => {

    userModel
        .findOne({email : req.body.email})
        .exec()
        .then(user => {
            if(!user){
                res.json({
                    msg : "등록된 이메일이 없음"
                });
            }else{

                bcrypt  
                    .compare(req.body.password, user.password)
                    .then(isMatch => {
                        if(isMatch){

                            const payload = {id : user.id, name : user.name, avatar : user.avatar};

                            //sign token
                            const token = jwt.sign(
                                payload,
                                process.env.SECRET_KEY,
                                {expiresIn : 3600}

                            );
                            return res.json({
                                msg : "successfull login",
                                tokenInfo : 'bearer' + token
                            });
                        }else{
                            res.json({
                                msg : 'password incorrect'
                            });
                        }

                    })
                    .catch(err => res.json(err));
            }
        })
        .catch(err => {
            res.json({
                msg : err.message
            });
        });

});

//current user
router.get('/currents', (req,res) => {

});






module.exports = router;
