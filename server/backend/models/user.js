const pool = require('../modules/pool');
const { NULL_VALUE } = require('../modules/responseMessage');
const table = 'user';

const user = {

    signup: async (name, password, salt, email) => {

        const fields = 'name, password, salt, email';
        const questions = `? ,?, ?, ?`;
        const values = [name, password, salt, email];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;

        try {
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('signup ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('signup ERROR : ', err);
            throw err;
        }
    },

    checkUser: async (email) => {

        const query = `SELECT * FROM ${table} WHERE email="${email}"`;

        try {
            const result = await pool.queryParam(query);
            if (result.length === 0) {
                return false;
            } else return true;

        } catch (err) {

            if (err.errno == 1062) {
                console.log('checkUser ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('checkUser ERROR : ', err);
            throw err;
        }
    },

    signin : async(email,password)=> {
        const query = `SELECT * FROM ${table} WHERE email="${email}" AND password="${password}"`;
        try{
            const result = await pool.queryParam(query);
            console.log(result)
            if(result.length === 0){
                return NULL_VALUE;
            }else return false;
        }catch(err){
            if(err.errno == 1062){
                console.log('signin ERROR', err.errno, err.code);
                return -1;
            }
            console.log('signin ERROR', err);
            throw err;
        }
    }
}

module.exports = user;