const {Pool} = require('pg');

const client = new Pool({
    user:'cm',
    password:'cm',
    database:'cmdb',
    host:'localhost',
    port:5432
})

module.exports = client;