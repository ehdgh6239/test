const express = require("express");
const app = express();

const guestRegisterRouter = require("./routers/guest_register");
const ownerRegisterRouter = require("./routers/owner_register");
const guestLoginRouter = require("./routers/guest_login");
const ownerLoginRouter = require("./routers/owner_login");
const guestMypageRouter = require("./routers/guest_mypage");
const ownerMypageRouter = require("./routers/owner_mypage");
const ownerStatusRouter = require("./routers/laundry_status");

// const ownerRegisterRouter = require("./routers/owner_register");

app.use(express.json());

require('dotenv').config();

app.use("/api", express.urlencoded({extended: false}), [
    guestRegisterRouter,
    ownerRegisterRouter,
    guestLoginRouter,
    ownerLoginRouter,
    guestMypageRouter,
    ownerMypageRouter,
    ownerStatusRouter
  ]);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/assets/index.html");
});

app.use(express.static("assets"));

app.get('/login/guest', (req, res) => {
    res.sendFile(__dirname + "/assets/guest_login.html");
});

app.get('/login/owner', (req, res) => {
    res.sendFile(__dirname + "/assets/owner_login.html");
});

app.get('/register/guest', (req, res) => {
    res.sendFile(__dirname + "/assets/guest_register.html");
});

app.get('/register/owner', (req, res) => {
    res.sendFile(__dirname + "/assets/owner_register.html");
});

app.get('/mypage/guest', (req, res) => {
    res.sendFile(__dirname + "/assets/guest_mypage.html");
});
app.get('/mypage/owner', (req, res) => {
    res.sendFile(__dirname + "/assets/owner_mypage.html");
});

app.get('/laundry/status/owner', (req, res) => {
    res.sendFile(__dirname + "/assets/laundry_status.html");
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});
