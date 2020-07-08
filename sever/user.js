const express = require('express');
let Router = express.Router();
let sqlUse = require("./db");

//用户登录模块
Router.put("/login", async (req, res) => {
    try {
        let { userid, pwd } = req.body;
        let sqlStr = `SELECT * FROM users WHERE user_id = "${userid}"`;
        let result = await sqlUse(sqlStr);
        let inf = {}
        if (!result.length) {
            inf={
                status:0,
                flag:false,
                msg:"用户不存在"
            }
        }else if(result[0].user_pwd!==pwd){
            inf={
                status:1,
                flag:false,
                msg:"密码错误"
            }
        }else{
            inf={
                status:2,
                flag:true,
                msg:{username:result[0].user_name}
            }
        }
        res.send(inf);
    } catch (err) {
        inf={
            status:-1,
            falg:false,
            msg:err
        }
        res.send(inf);
    }
})

// 用户注册
Router.post("/register", async (req,res)=>{
    try {
        let { userid, pwd , username} = req.body;
        let sqlStr1 = `SELECT * FROM users WHERE user_id = "${userid}"`;
        let sqlStr2 = `INSERT INTO users (user_id,user_pwd,user_name) VALUES ('${userid}','${pwd}','${username}')`
        let result1 = await sqlUse(sqlStr1);
        let inf = {}
        if (result1.length) {
            inf={
                status:0,
                flag:false,
                msg:"该用户已存在"
            }
        }else{
            // 不存在时给用户注册
            let result2 = await sqlUse(sqlStr2);
            inf={
                status:1,
                flag:true,
                msg:"注册成功"
            }
        }
        res.send(inf);
    } catch (err) {
        inf={
            status:-1,
            falg:false,
            msg:err
        }
        res.send(inf);
    }
})
module.exports = Router;