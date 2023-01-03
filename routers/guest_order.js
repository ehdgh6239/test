const express = require("express");
const router = express.Router();
const {Op} = require('sequelize');
const {Cloth} = require("../models");

router.post('/order/guest',async (req, res) => {
    try { 
        const { tel, address, ask } = req.body;
       
        await Cloth.create({ tel,address,ask});
        
        res.status(201).send({"massage" : "세탁을 신청했습니다!"});
   
        } catch (error) {
        console.error(error);
        res.status(400).send({"errorMessage":"실패하였습니다."});
        }
    });
router.get('/order/guest', async(req,res) =>{
    try {
        const user = await Cloth.findAll();
        // 오류 예제
        // try catch 있을때/없을때
        // const posts = await NonexistentCollection.find({});
    
        res.send(user);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
      }
    });  
    
module.exports = router;