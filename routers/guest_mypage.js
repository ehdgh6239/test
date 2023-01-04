const express = require('express');
const router = express.Router();
const cookieParser = require("cookie-parser");
const {Op} = require('sequelize');
const {Owner} = require('../models');
const {Guest} = require('../models');
const authMiddleWare = require("../middlewares/auth-middleware");

const app = express();
app.use(cookieParser());



    router.get('/mypage/guest', async (req, res) => {
    const  guestId =  String( req.query.login_id )

    // const guestName = res.locals.guest.login_id
    

    try {
        const guest = await Guest.findOne({
          where: { login_id : guestId },
        });
        
        const guestName = guest.guest_name
        const guestPoint = guest.guest_point
    
        return res.json({"guestName" : guestName, "guestPoint" : guestPoint});
      } catch (err) {
        return res.status(400).send({ errorMessage: "실패하였습니다." });
      }
    });
    
    module.exports = router;
