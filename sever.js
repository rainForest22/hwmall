const express= require('express');
const bodyParser=require('body-parser');
const allRouter = require('./sever/nodeIndex');
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ rextend: false }));
app.use(allRouter);
app.use(express.static('./'))
app.listen(3100, () => {
    console.log("servers start complete");
    console.log("ready...");
});
