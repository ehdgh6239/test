const express = require("express");
const app = express();

const guestRegisterRouter = require("./routers/guest_register");
const ownerRegisterRouter = require("./routers/owner_register");
const guestLoginRouter = require("./routers/guest_login");
const ownerLoginRouter = require("./routers/owner_login");
// const ownerRegisterRouter = require("./routers/owner_register");

app.use(express.json());

require('dotenv').config();

app.use("/api", [
    guestRegisterRouter,
    ownerRegisterRouter,
    guestLoginRouter,
    ownerLoginRouter 
  ]);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/assets/index.html");
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});
