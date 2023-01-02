const express = require("express");
const cookieParser = require("cookie-parser");
const router = express.Router();
const { Owner } = require("../models");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "1234";

const app = express();
app.use(cookieParser());

router.post("/login/owner", async (req, res) => {
  const { login_id, login_pw } = req.body;

  try {
    const owner = await Owner.findOne({
      where: { login_id },
    });

    if (!owner || owner.login_pw !== login_pw) {
      return res
        .status(412)
        .send({ errorMessage: "닉네임 또는 패스워드를 확인해주세요." });
    }

    const token = jwt.sign(
      { login_id: login_id, owner_id: owner.owner_id },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token);

    return res.json({ token: token });
  } catch (err) {
    return res.status(400).send({ errorMessage: "로그인에 실패하였습니다." });
  }
});

module.exports = router;
