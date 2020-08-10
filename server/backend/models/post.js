const pool = require('../modules/pool');
const { NULL_VALUE } = require('../modules/responseMessage');

const table = 'post';

const post = {

    insert: async (name, title, content) => {
        const fields = 'name, title, content';
        const questions = `?, ?, ?`;
        const values = [name, title, content];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;

        try {
            const result = await pool.queryParamArr(query, values);
            console.log(result);
            const insertId = result.idx;
            return insertId;
        } catch (err) {
            if (err == 1062) {
                console.log('post insert ERROR(duplicate) : ', err.errno, err.code);
                return -1
            }
            console.log('post insert ERROR : ', err);
            return -1
        }
    },

    selectAll: async () => {
        const query = `SELECT * FROM ${table}`

        try {
            const result = await pool.queryParam(query);
            if(result.length===0)
            {
                return NULL_VALUE
            }
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('post selectAll ERROR(duplicate) : ', err.errno, err.code)
                return -1
            }
            console.log('post selectAll ERROR : ', err);
            return -1;
        }
    },

    selectOne: async (idx) => {
        const query = `SELECT * FROM ${table} WHERE idx=${idx}`

        try {
            const result = await pool.queryParam(query);
            if(result.length === 0){
                return NULL_VALUE
            }
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('post selectOne ERROR(duplicate) : ', err.errno, err.code)
                return -1
            }
            console.log('post selectOne ERROR : ', err.errno);
            return -1;
        }
    },

    update: async (idx, title, content) => {
        const query = `UPDATE ${table} SET title='${title}' ,content='${content}' WHERE idx=${idx}`

        try {
            const result = await pool.queryParam(query)
            const updateIdx = result.idx
            return updateIdx
        } catch (err) {
            if (err.errno == 1062) {
                console.log('post update ERROR(duplicate) : ', err.errno, err.code)
                return -1
            }
            console.log('post update ERROR : ', err.errno);
            return -1;
        }
    },

    delete: async (idx) => {
        const query = `DELETE FROM ${table} WHERE idx=${idx}`

        try {
            const result = await pool.queryParam(query)
            return 1
        } catch (err){
            if (err.errno == 1062) {
                console.log('post delete ERROR(duplicate) : ', err.errno, err.code)
                return -1
            }
            console.log('post delete ERROR : ', err.errno);
            return -1;
        }
    }

}

module.exports = post;