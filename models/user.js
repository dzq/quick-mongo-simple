const mongoose = require("../utils/mongodb")
const dayjs = require("dayjs")

// User模型
const UserSchema = new mongoose.Schema({
    id:{type:String, default: dayjs().unix()},
    name:String,
    pwd:{type: String,required:true,
        set(val){ // 密码加密
            return require("bcrypt").hashSync(val,10)
        }},
    mobile:{type: String, required:true},
    createTime:String,
    updateTime:String,
},{
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
})
const User = mongoose.model("User",UserSchema)
// export
module.exports = User;