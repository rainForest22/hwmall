const http = require('http');
const url = require('url');
const mysql = require('mysql');
// 接收前端请求
var sever = http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json;charset=utf8", "Access-Control-Allow-Origin": "http://localhost" });
    // 获取请求数据
    console.log(req.url);

    let data = url.parse(req.url, true).query;
    // 连接数据库
    let db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'hwmall'
    });
    db.connect((err) => {
        if (err) throw err;
        console.log('数据库连接成功');
    });
    //执行sql语句
    let sqlSearch=`SELECT * FROM goods where good_type= "${data.type}"`;
    db.query(sqlSearch,(err,result)=>{
        res.end(result);
        db.end();
    })
});
sever.listen(8082, function () {
    console.log('服务器启动成功');
})