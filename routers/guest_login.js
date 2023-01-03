const express = require("express");
const cookieParser = require("cookie-parser");
const router = express.Router();
const { Guest } = require("../models");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "1234";

const app = express();
app.use(cookieParser());

router.post("/login/guest", async (req, res) => {
  const { login_id, login_pw } = req.body;

  try {
    const guest = await Guest.findOne({
      where: { login_id },
    });

    console.log(guest);

    if (!guest || guest.login_pw !== login_pw) {
      return res
        .status(412)
        .send({ errorMessage: "닉네임 또는 패스워드를 확인해주세요." });
    }

    const token = jwt.sign(
      { login_id: login_id, guest_id: guest.guest_id },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token);

    return res.json({ "token": token });
  } catch (err) {
    return res.status(400).send({ errorMessage: "로그인에 실패하였습니다." });
  }
});

module.exports = router;
