# quick-mongo-simple
duzq-quick-mongo 示例

使用说明

安装

`$ npm install duzq-quick-mongo`

建立mongodb数据模型

```js
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
```

初始化控制器

```js
const {Controller} = require("duzq-quick-mongo")
const user = new Controller( require("../models/User"))
```

添加路由

```js
router.post("/add", user.add)
router.post("/getItem", user.getItem)
router.post("/delete", user.delete)
router.post("/update", user.update)
router.post("/list", user.list)
router.post("/search", user.search)
```

恭喜你。

实现了User模块的增删改查的功能。