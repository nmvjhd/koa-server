/**
 * Created by Administrator on 2017/8/30.
 */
const MYSQL = require('../db/mysql');

class SqlMarker{
    constructor(tableName){
        this.tableName = tableName;
    }

    gets(){
        let sql = `SELECT * from ${this.tableName}`;
        return sql;
    }

    clear(){
        let sql = `TRUNCATE TABLE ${this.tableName}`;
        return sql;
    }

    add(item){
        let sql = `insert into ${this.tableName} values ("${item.name}","${String(item.num)}")`;
        return sql;
    }

    del(itemKeyValue){
        let sql = `delete from ${this.tableName} where name="${itemKeyValue}"`;
        return sql;
    }

    get(itemId){
        let sql = `delete from ${this.tableName} where name="${itemId}"`;
        return sql;
    }

    update(item) {
        let sql = `update ${this.tableName} set num="${item.num}" where name="${item.name}"`;
        return sql;
    }
}

class Users{
    constructor(){
        this.db = MYSQL.getInstance();
        this.db.connect();
        this.sql = new SqlMarker('users');
    }

    async gets(){
        return await this.db.exec(this.sql.gets());
    }

    async clear(){
        return await this.db.exec(this.sql.clear());
    }

    async add(user){
        return await this.db.exec(this.sql.add(user));
    }

    async remove(userId){
        return await this.db.exec(this.sql.del(userId));
    }

    async get(userId){
        return await this.db.exec(this.sql.get(userId));
    }

    async update(user){
        return await this.db.exec(this.sql.update(user));
    }

    destory(){
        this.db.end();
    }
}

module.exports = Users;