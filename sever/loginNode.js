//引入依赖
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
    //判断用户是否已经存在
    new Promise((resolve, rejects) => {
        let sqlSearch = `SELECT * FROM users where user_id = "${data.username}"`;
        db.query(sqlSearch, (err, result) => {
            if (result.length == 0) {
                resolve()
            } else {
                rejects(result);
            }
        })
    }).then(() => {
        // 不存在时提醒用户账号错误
        res.end('{"status":0,"msg":"用户名不存在"}');
        db.end();
    }).catch((result) => {
        // 用户存在确认密码是否正确
        if (result[0].user_pwd === data.pwd) {
            res.end('{"status":1,"msg":"登录成功，跳转首页"}');
        } else {
            res.end('{"status":-1,"msg":"密码错误"}');
        }
        db.end();
    })
});
sever.listen(8081, function () {
    console.log('服务器启动成功');
})