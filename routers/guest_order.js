const express = require("express");
const router = express.Router();
const {Op} = require('sequelize');
const {Cloth} = require("../models");
const {Guest} = require("../models");

router.post('/order/guest',async (req, res) => {
    try { 
        const { tel, address, ask, status, guest_id } = req.body;
       
        await Cloth.create({ tel,address,ask, status, guest_id});

        const guest = await Guest.findOne({where : {guest_id : guest_id}});

        if (guest.guest_point < 10000) {
          return res.status(412).send({"errorMessage": "마이포인트가 부족합니다!"})
      }

        const usePoint = 10000

        const updatePoint = guest.guest_point - usePoint

        await guest.update( {guest_point : updatePoint});
        
        res.status(201).send({"massage" : "세탁을 신청했습니다!"});
   
        } catch (error) {
        console.error(error);
        res.status(400).send({"errorMessage":"실패하였습니다."});
        }
    });


router.get('/order/guest', async (req, res) => {
      const  guestId =  String( req.query.login_id )
  
      try {
          const guest = await Guest.findOne({
            where: { login_id : guestId },
          });
          
          const guestName = guest.guest_name
          const guestPk = guest.guest_id
      
          return res.json({"guestName" : guestName, "guestPk" : guestPk});
        } catch (err) {
          return res.status(400).send({ errorMessage: "실패하였습니다." });
        }
      });
 
    
module.exports = router;