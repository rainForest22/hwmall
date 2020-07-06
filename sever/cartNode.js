//引入依赖
const http = require('http');
const url = require('url');
const mysql = require('mysql');

// 接收前端请求
var sever = http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json;charset=utf8", "Access-Control-Allow-Origin": "http://localhost" });
    // 获取请求数据    
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
        let sqlSearch1 = `SELECT * FROM cart where user_id = "${data.user_id}"`;
        db.query(sqlSearch1, (err, result) => {    
            if (result.length) {
                resolve()
            } else {
                rejects();
            }
        })
    }).then(() => {
        
        // 存在则多表查询相关数据
        let sqlSearch2 = `SELECT cart.*,good_dsc,good_src,good_name,good_price FROM cart , goods WHERE cart.good_id = goods.good_id AND user_id=${data.user_id}`;
        db.query(sqlSearch2, (error, results) => {
            if (error) throw error;
            res.end(`{"status":1,"msg":${JSON.stringify(results)}}`);
        });
        db.end();
    }).catch(() => {
        // 用户还未添加商品
        db.end();
        res.end('{"status":0,"msg":"用户还未添加商品"}');
    })
    //断开数据库连接
});
sever.listen(8083, function () {
    console.log('服务器启动成功');
})