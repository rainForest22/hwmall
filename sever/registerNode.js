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
        let sqlSearch = `SELECT * FROM users where user_id = "${data.userid}"`;
        db.query(sqlSearch, (err, result) => {
            if (result.length == 0) {
                resolve()
            } else {
                rejects();
            }
        })
    }).then(() => {
        // 不存在时新增用户
        let sqlInsert = `INSERT INTO users (user_id,user_pwd,user_name) VALUES ('${data.userid}','${data.pwd}','${data.username}')`
        db.query(sqlInsert, (error, results) => {
            if (error) throw error;
            res.end('{"status":"success","msg":"恭喜您注册成功"}');
        });
        db.end();
    }).catch(() => {
        // 用户存在返回错误信息
        db.end();
        res.end('{"status":"fail","msg":"用户名已存在"}');
    })
    //断开数据库连接
});
sever.listen(8080, function () {
    console.log('服务器启动成功');
})