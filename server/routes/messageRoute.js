const express = require("express");

// importing the controllers
const { protectRoute } = require("../middlewares/auth");
const { getUsersForSidebar, getMessage, markMessageAsSeen, sendMessage } = require("../controllers/messageController");

const router = express.Router();

router.get("/users",protectRoute,getUsersForSidebar);
router.get("/:id",protectRoute,getMessage);
router.put("/mark/:id",protectRoute,markMessageAsSeen);
router.post("/send/:id",protectRoute,sendMessage);

module.exports = router;