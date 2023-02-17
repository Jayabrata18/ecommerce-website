const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorization");
const User = require("../models/User");

router.get("/", auth, async (req, res) => {
  try {
    // console.log(req.user);
    const user = await User.findById(req.user.id).select("-password");
    // console.log(user);
    res.json(user);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
