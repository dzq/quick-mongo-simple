# quick-mongo-simple
duzq-quick-mongo 示例

## 使用说明

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

## 接口使用

### 添加数据

请求参数

```json
{
	"name": "dzq",
	"mobile": "13800138000",
	"pwd": "123456"
}
```

返回结果

```json
{
	"code": 200,
	"msg": "success",
	"data": {
		"id": "1608954581",
		"_id": "5fe6b2f1eb030db3f5d4c1bd",
		"name": "dzq",
		"mobile": "13800138000",
		"pwd": "$2b$10$VMgVXPNSI7TuHtIYo0vY0ufi6PgsCEc.sv1VkSl0KKkd9Hv3u4gOO",
		"createTime": "Sat Dec 26 2020 11:50:10 GMT+0800 (China Standard Time)",
		"updateTime": "Sat Dec 26 2020 11:50:10 GMT+0800 (China Standard Time)",
		"__v": 0
	}
}
```

### 获取数据

请求参数

```json
{
	"id": "1608954581"
}
```

返回结果

```json
{
	"code": 200,
	"msg": "success",
	"data": {
		"id": "1608954581",
		"_id": "5fe6b2f1eb030db3f5d4c1bd",
		"name": "dzq",
		"mobile": "13800138000",
		"pwd": "$2b$10$VMgVXPNSI7TuHtIYo0vY0ufi6PgsCEc.sv1VkSl0KKkd9Hv3u4gOO",
		"createTime": "Sat Dec 26 2020 11:50:10 GMT+0800 (China Standard Time)",
		"updateTime": "Sat Dec 26 2020 11:50:10 GMT+0800 (China Standard Time)",
		"__v": 0
	}
}
```

### 删除数据

请求参数

```json
{
	"id": "1608954581"
}
```

返回结果

```json
{
	"code": 200,
	"msg": "success",
	"data": {
		"id": "1608954581",
		"_id": "5fe6b2f1eb030db3f5d4c1bd",
		"name": "dzq",
		"mobile": "13800138000",
		"pwd": "$2b$10$VMgVXPNSI7TuHtIYo0vY0ufi6PgsCEc.sv1VkSl0KKkd9Hv3u4gOO",
		"createTime": "Sat Dec 26 2020 11:50:10 GMT+0800 (China Standard Time)",
		"updateTime": "Sat Dec 26 2020 11:50:10 GMT+0800 (China Standard Time)",
		"__v": 0
	}
}
```

错误结果

```json
{
	"code": 301,
	"msg": "failed"
}
```

### 更新数据

请求参数

```json
{
	"id": "1608954581",
	"updateData": {
		"mobile": 13800138099,
		"pwd": "666666"
	}
}
```

### 获取数据列表

请求参数

```json
{
	"pageSize": 10,
	"page": 1
}
```

返回结果

```json
{
	"code": 200,
	"msg": "success",
	"data": {
		"pageSize": 10,
		"page": 1,
		"total": 1,
		"data": [
			{
				"id": "1608954581",
				"name": "dzq",
				"mobile": "13800138000",
				"pwd": "$2b$10$4otU4K9W08whZ3DFJyflBeXgxzRGrHpxlHKT940gDvvvgLmCBYT4a",
				"createTime": "Sat Dec 26 2020 11:57:19 GMT+0800 (China Standard Time)",
				"updateTime": "Sat Dec 26 2020 11:57:19 GMT+0800 (China Standard Time)"
			}
		]
	}
}
```

### 查找数据

请求参数

默认查询条件为与操作，条件满足其中一条需要设置operator为or

```json
{
	"pageSize": 10,
	"page": 1,
	"conditions": {
		"name": "dzq",
		"mobile": "18518318421"
	},
	"operator": "or"
}
```

返回结果

```json
{
	"code": 200,
	"msg": "success",
	"data": {
		"pageSize": 10,
		"page": 1,
		"total": 1,
		"data": [
			{
				"id": "1608954581",
				"name": "dzq",
				"mobile": "13800138000",
				"pwd": "$2b$10$4otU4K9W08whZ3DFJyflBeXgxzRGrHpxlHKT940gDvvvgLmCBYT4a",
				"createTime": "Sat Dec 26 2020 11:57:19 GMT+0800 (China Standard Time)",
				"updateTime": "Sat Dec 26 2020 11:57:19 GMT+0800 (China Standard Time)"
			}
		]
	}
}
```

## 高级应用

插件提供了一下高级自定义功能

```js
const {Controller} = require("duzq-quick-mongo")
const user = new Controller( require("../models/User"))
// 设置数据查询字段
user.projection = {"__v":0,"pwd":0,"updateTime":0,"createTime":0}
// 设置成功编号
user.CODE_OK = 200
// 设置成功消息
user.MSG_OK = "请求成功"
// 设置失败编号
user.CODE_ERROR = 201
// 设置失败消息
user.MSG_ERROR = "请求错误"
```

自定义前返回数据

```json
{
	"code": 200,
	"msg": "success",
	"data": {
		"id": "1608954581",
		"_id": "5fe6b2f1eb030db3f5d4c1bd",
		"name": "dzq",
		"mobile": "13800138000",
		"pwd": "$2b$10$VMgVXPNSI7TuHtIYo0vY0ufi6PgsCEc.sv1VkSl0KKkd9Hv3u4gOO",
		"createTime": "Sat Dec 26 2020 11:50:10 GMT+0800 (China Standard Time)",
		"updateTime": "Sat Dec 26 2020 11:50:10 GMT+0800 (China Standard Time)",
		"__v": 0
	}
}
```

自定义后获取数据

```json
{
	"code": 200,
	"msg": "请求成功",
	"data": {
		"id": "1608954581",
		"_id": "5fe6b49feb030db3f5d4c1be",
		"name": "dzq",
		"mobile": "13800138000"
	}
}
```

更加功能需求请提交issue

https://github.com/dzq/quick-mongo