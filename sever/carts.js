const express = require('express')
let Router = express.Router()
let sqlUse = require('./db')
Router.get("/gain", async (req,res)=>{
    try {
        let {userid}=req.query;
        let sqlStr1 = `SELECT * FROM cart where user_id = "${userid}"`
        let result1 = sqlUse(sqlStr1);
        let inf = {}
        if(!result1.length){
            inf={status:0,msg:"用户还未添加商品"};
        }else{
            let sqlStr2=`SELECT cart.*,good_dsc,good_src,good_name,good_price FROM cart , goods WHERE cart.good_id = goods.good_id AND user_id=${userid}`;
            let result2=sqlUse(sqlStr2);
            inf = {status:1,msg:JSON.stringify(results)}
        }
        res.send(inf)
    } catch (error) {
        throw err
    }
})
module.exports = Router;