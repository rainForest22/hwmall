const mysql= require('mysql');
function useDB(sqlStr) { 
    let db=mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'hwmall',
        multipleStatement: true
    });
    return new Promise((resolve,reject)=>{
        db.query(sqlStr,(err,result)=>{
            if(err)reject(err);
            resolve(result);
        })
    })
}
module.exports = useDB;