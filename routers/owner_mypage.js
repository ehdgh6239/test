const express = require('express');
const router = express.Router();
const cookieParser = require("cookie-parser");
const {Op} = require('sequelize');
const {Owner} = require('../models');
const {Guest} = require('../models');
const authMiddleWare = require("../middlewares/auth-middleware");

const app = express();
app.use(cookieParser());



router.get('/mypage/owner', async (req, res) => {
    const  ownerId =  String( req.query.login_id )

    // const guestName = res.locals.guest.login_id
    

    try {
        const owner = await Owner.findOne({
          where: { login_id : ownerId },
        });
        
        const ownerName = owner.owner_name
        const ownerPoint = owner.owner_point
    
        return res.json({"ownerName" : ownerName, "ownerPoint" : ownerPoint});
      } catch (err) {
        return res.status(400).send({ errorMessage: "실패하였습니다." });
      }
    });
    
    module.exports = router;