const express = require("express");

// importing the controllers
const { signup, login, updateProfile, checkAuth } = require("../controllers/userController");
const { protectRoute } = require("../middlewares/auth");

const router = express.Router();

router.post("/signup" , signup);
router.post("/login" , login);
router.put("/update-profile" ,protectRoute,updateProfile);
router.get("/check" , protectRoute,checkAuth);

module.exports = router;