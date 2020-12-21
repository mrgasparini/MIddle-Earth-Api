const databaseConnection = require('./config/database');

async function registerUser(user, hash){
    try{
        const conn = await databaseConnection.connect();
        const sql = 'INSERT INTO users (username, password, voted) VALUES (?, ?, ?);';
        const values = [user, hash, false];
        return await conn.query(sql, values);
    }
    catch(err){
        console.log('Failed to register a new user: ', err)
    }
}

async function updateUserVotedStatus(userId, voted){
    try{
        const conn = await databaseConnection.connect();
        const sql = 'UPDATE users SET voted=? WHERE id=?;';
        const values = [voted, userId];
        return await conn.query(sql, values);
    }
    catch(err){
        console.log('Failed to update voted status: ', err)
    }
}

async function getUserById(userId){
    try{
        const conn = await databaseConnection.connect();
        const sql = 'SELECT * FROM users WHERE id=?;';
        const values = [userId];
        return await conn.query(sql, values);
    }
    catch(err){
        console.log('Failed to update voted status: ', err)
    }
}

async function getUserByUsername(username){
    try{
        const conn = await databaseConnection.connect();
        const sql = 'SELECT * FROM users WHERE username=?;';
        const values = [username];
        return await conn.query(sql, values);
    }
    catch(err){
        console.log('Failed to update voted status: ', err)
    }
}


module.exports = { registerUser, updateUserVotedStatus, getUserById, getUserByUsername }