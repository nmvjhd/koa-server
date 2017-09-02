/**
 * Created by Administrator on 2017/8/29.
 */

const mysql = require('mysql');

function makeExecute(conection) {
    return (sql) => {
        return new Promise((resolve,reject) => {
            console.log(sql);
            conection.query(sql,(err,result) => {
                if(err) reject(err);
                resolve(result);
            })
        });
    }
}

class MYSQL{
    constructor(){
        this.conection = null;
        this.items = {};
    }

    static getInstance(){
        if(this.instance){
            return this.instance;
        }
        else{
            this.instance = new MYSQL();
            return this.instance;
        }
    }

    connect(){
        this.conection = mysql.createConnection({
            host: 'localhost',
            user: 'me',
            password: 'secret',
            database: 'my_db',
        });
        this.execute = makeExecute(this.conection);
    }

    async exec(sql){
        return await this.execute(sql);
    }

    end(){
        this.conection.end();
    }
}

module.exports = MYSQL;