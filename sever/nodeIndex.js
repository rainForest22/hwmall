const express= require('express');
const Router=express.Router();
let userRouter=require("./user");
let cartRouter=require("./carts");
let goodRouter = require("./good")
Router.use("/user",userRouter);
Router.use("/cart",cartRouter)
Router.use("/good",goodRouter)

module.exports = Router;