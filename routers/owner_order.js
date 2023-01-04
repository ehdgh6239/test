const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');
const {Guest} = require('../models');
const {Cloth} = require('../models');

router.get('/order/owner', async(req,res) =>{
    try {
        const cloth = await Cloth.findAll({where: {owner_id : null}});


        // 오류 예제
        // try catch 있을때/없을때
        // const posts = await NonexistentCollection.find({});
    
        return res.send({"cloth" : cloth});
      } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
      }
    }); 

module.exports = router;