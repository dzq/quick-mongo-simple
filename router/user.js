'use strict';
const express = require("express");
const router = express.Router();
const {Controller} = require("duzq-quick-mongo")
const user = new Controller( require("../models/User"))
// 自定义功能
// user.projection = {"__v":0,"pwd":0,"updateTime":0,"createTime":0}
// user.CODE_OK = 200
// user.MSG_OK = "请求成功"
// user.CODE_ERROR = 201
// user.MSG_ERROR = "请求错误"
// user.getCondition = function(data){
//     if (data.id.match(/^[0-9a-fA-F]{24}$/)) {
//         return {"_id": (data.id)}
//     }
//     return {}
// }

router.post("/add", user.add)
router.post("/getItem", user.getItem)
router.post("/delete", user.delete)
router.post("/update", user.update)
router.post("/list", user.list)
router.post("/search", user.search)


module.exports = router;