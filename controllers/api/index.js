const router = require("express").Router();

const userRoutes = require("./userRoutes");
const messageRoutes = require("./messageRoutes");
const chatroomRoutes = require("./chatroomRoutes");

// include page routes in here at some points

router.use("/user", userRoutes);
router.use("/message", messageRoutes);
router.use("/chatroom", chatroomRoutes);


module.exports = router;
