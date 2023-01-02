const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');
const {Guest} = require('../models');

router.post('/register/guest', async (req, res) => {
    const {login_id, login_pw, guest_name, guest_email, confirmpw} = req.body;
    const nameReg = /^[a-zA-Z0-9]{3,}$/

    try {
        if (!nameReg.test(login_id)) {
            return res.status(412).send({"errorMessage": "ID의 형식이 일치하지 않습니다."})
        }

        if (login_pw.length < 4) {
            return res.status(412).send({"errorMessage": "패스워드의 형식이 일치하지 않습니다."})
        }

        if (login_pw === login_id) {
            return res.status(412).send({"errorMessage": "패스워드와 닉네임이 일치합니다."})
        }
        
        if (login_pw !== confirmpw) {
            return res.status(412).send({"errorMessage": "패스워드가 일치하지 않습니다."})
        }
        console.log(1);


        const existGuest = await Guest.findAll({
            where: {guest_name: guest_name}
        })
         console.log(existGuest);
        
        if (existGuest.length){
             return res.status(412).send({"errorMessage": "중복된 닉네임입니다."})
        }

        const guest_point = 1000000;

        await Guest.create({
            login_id, 
            login_pw, 
            guest_name, 
            guest_email, 
            guest_point,
        })

        res.status(201).send({message: "회원가입 성공!"})

    } catch(err) {
        res.status(400).send({"errorMessage": "요청한 데이터 형식이 올바르지 않습니다."})
    }
});

module.exports = router;