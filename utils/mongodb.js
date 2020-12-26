
// 数据库
const mongoose = require("mongoose")
const url = 'mongodb://localhost:27017/SimpleDemo'
mongoose.connect(url,{
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex:true,
    useUnifiedTopology: true
})
const db = mongoose.connection;

db.once('open' ,() => {
    console.log('Connect to MongoDb success!')
})

db.on('error', function(error) {
    console.log('Error in MongoDb connection: ' + error)
    mongoose.disconnect();
});

db.on('close', function() {
    console.log('Mongodb closed,please reconnect!')
    mongoose.connect(url, {server:{auto_reconnect:true}});
});

module.exports = mongoose;