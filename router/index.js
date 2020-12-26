const express = require("express");

// 注册路由
const router = express.Router();
router.get("/", function(req, res) {
    res.end("demo");
});
router.post("/", function(req, res) {
    res.end("demo");
});

router.use("/user", require("./user")) // 用户接口

module.exports = router;