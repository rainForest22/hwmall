const http = require('http');
const url =require('url')
var sever=http.createServer(function (req,res) {  
        console.log(req.url);
        
        res.writeHead(200,{"Content-Type":"text/plain","Access-Control-Allow-Origin":"http://localhost"});
        res.end('{"status":"success","msg":"抱歉，该用户名已经被注册，请重新选择一个更优秀的名字！！"}');
});
sever.listen(8080,function(){
    console.log('服务器启动成功');
    
})