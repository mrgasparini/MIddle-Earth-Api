const mysql = require('mysql2/promise');

async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    try{
        const connectionString = `mysql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}
        @${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}
        /${process.env.DATABASE_NAME}`
        const connection = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME

        })
        console.log('Connection has been established successfully.');
        global.connection = connection;
        return connection;
    }
    catch(err){
        console.error('Unable to connect to the database:', err);
    }
}

module.exports = { connect }