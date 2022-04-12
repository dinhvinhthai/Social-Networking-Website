const router = require("express").Router();
const userModal = require("../model/usersModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//register
router.post("/register", async (req, res) => {
  try {
    const userQuery = await userModal.findOne({ email: req.body.email });

    if (!req.body.email.includes("ctu.edu.vn")) {
      return res.status(500).json("su dung email ctu");
    }

    if (userQuery) {
      return res.status(500).json("da ton tai email");
    }

    const newUser = await new userModal(req.body);
    await newUser.save();
    res.status(200).json({ message: "dang ki thanh cong", newUser });
  } catch (err) {
    res.status(500).json(err);
  }
});
//login
router.post("/login", async (req, res) => {
  try {
    const userQuery = await userModal.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    console.log(userQuery);
    if (userQuery) {
      const email = req.body.email;
      const token = jwt.sign({ email }, process.env.TOKEN_SR);
      return res
        .status(200)
        .json({ message: "dang nhap thanh cong", userInfo: userQuery, token });
    } else {
      return res.status(200).json("sai tai khoan");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
