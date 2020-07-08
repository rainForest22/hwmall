const express = require('express')
let Router = express.Router()
let sqlUse = require('./db')
Router.get("/gain", async (req, res) => {
    try {
        let { user_id } = req.query;
        let sqlStr1 = `SELECT * FROM cart WHERE user_id = "${user_id}"`;
        let result1 = await sqlUse(sqlStr1);
        let inf = {}
        if (!result1.length) {
            inf = { status: 0, msg: "用户还未添加商品" };
        } else {
            let sqlStr2 = `SELECT cart.*,good_dsc,good_src,good_name,good_price FROM cart , goods WHERE cart.good_id = goods.good_id AND user_id=${user_id}`;
            let result2 = await sqlUse(sqlStr2);
            inf = { status: 1, msg: result2 }
        }
        res.send(inf)
    } catch (error) {
        throw err
    }
})

Router.put("/change", async (req, res) => {
    try {
        let { user_id, good_id, num } = req.body;
        let sqlStr1 = `SELECT * FROM cart WHERE good_id = "${good_id}"`;
        let sqlStr2 = "";
        let result2;
        let result1 = await sqlUse(sqlStr1);
        if (result1.length) {
            // 商品存在添加商品数目
            sqlStr2 = `UPDATE cart SET num = "${result1[0].num * 1 + num * 1}" WHERE good_id = ${good_id}`;
        } else {
            sqlStr2 = `INSERT INTO cart (good_id,user_id,num) VALUES("${good_id}","${user_id}","${num}")`
        }
        result2 = await sqlUse(sqlStr2);
        res.send({status:"success"})
    } catch (err) {
        throw err
    }
})

Router.get("/num", async (req, res) => {
    try {
        let { user_id } = req.query;
        let sqlStr = `SELECT num FROM cart WHERE user_id = "${user_id}"`;
        let result = await sqlUse(sqlStr);
        let inf = { num: 0 };
        result.forEach(element => {
            inf.num += element.num * 1;
        });
        res.send(inf);
    } catch (err) {
        throw err
    }
})
// 修改单个
Router.get("/singleChange", async (req, res) => {
    try {
        let { good_id, num } = req.query;
        let sqlStr
        let inf = { num: 0 };
        if(num){
            sqlStr = `UPDATE cart SET num = "${num}" WHERE good_id = "${good_id}"`;
        }else{
            sqlStr = `DELETE FROM cart WHERE good_id = "${good_id}"`
        }
        let result = await sqlUse(sqlStr);
        res.send(inf);
    } catch (err) {
        throw err
    }
})
// 删除单个
Router.get("/singleDelete", async (req, res) => {
    try {
        let { good_id } = req.query;
        let sqlStr = `DELETE FROM cart WHERE good_id = "${good_id}"`;
        let inf = { num: 0 };
        let result = await sqlUse(sqlStr);
        res.send(inf);
    } catch (err) {
        throw err
    }
})

// 删除多个
Router.get("/Delete", async (req, res) => {
    try {
        let { good_ids } = req.query;
        let sqlStr = `DELETE FROM cart WHERE good_id in (${good_ids})`;
        let inf = { num: 0 };
        let result = await sqlUse(sqlStr);
        res.send(inf);
    } catch (err) {
        throw err
    }
})

module.exports = Router;