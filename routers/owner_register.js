const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');
const {Owner} = require('../models');
const bcrypt = require('bcrypt');

router.post('/register/owner', async (req, res) => {
    const {login_id, login_pw, owner_name, owner_email, confirmpw} = req.body;
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

        const hashedPassword = await bcrypt.hash(login_pw,10);
        const existOwner = await Owner.findAll({
            where: {owner_name: owner_name}
        })
         console.log(existOwner);
        
        if (existOwner.length){
             return res.status(412).send({"errorMessage": "중복된 닉네임입니다."})
        }

        const owner_point = 0;

        await Owner.create({
            login_id, 
            login_pw : hashedPassword, 
            owner_name, 
            owner_email,
            owner_point,
        })

        res.status(201).send({message: "회원가입 성공!"})

    } catch(err) {
        return res.status(400).send({"errorMessage": "요청한 데이터 형식이 올바르지 않습니다."})
    }
});

module.exports = router;