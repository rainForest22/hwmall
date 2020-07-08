const express = require("express")
let Router = express.Router()
let sqluse = require("./db")
Router.get('/floor', async (req,res)=>{
    try {
        let {type} = req.query;
        let sqlStr = `SELECT * FROM goods WHERE good_type="${type}"`
        let result = await sqluse(sqlStr)
        res.send(JSON.stringify(result));
    } catch (err) {
        throw err;
    }
})
    Router.get('/single',async (req,res)=>{
        try {
            let {good_id}=req.query;
            let sqlStr = `SELECT * FROM goods WHERE good_id = "${good_id}"`
            let result = await sqluse(sqlStr)
            res.send(result[0])
        } catch (err) {
            throw err
        }
    })
module.exports = Router;