const databaseConnection = require('./config/database');

async function RegisterVote(placeId, userId){
    try{
        const conn = await databaseConnection.connect();
        const sql = 'INSERT INTO voting (fk_placeId, fk_userId) VALUES (?, ?);';
        const values = [placeId, userId];
        return await conn.query(sql, values);
    }
    catch(err){
        console.log('Failed to register a new vote: ', err)
    }
}

async function GetVoteByUserId(userId){
    try{
        const conn = await databaseConnection.connect();
        const sql = 'SELECT fk_placeId as placeId FROM voting WHERE fk_userId=?;';
        const values = [userId];
        const response = await conn.query(sql, values);
        return response[0]
    }
    catch(err){
        console.log('Failed to get a vote: ', err)
    }
}

async function GetVotes(){
    try{
        const conn = await databaseConnection.connect();
        const sql = 'SELECT fk_placeId as placeId, COUNT(fk_placeId) as votesNum FROM voting group by fk_placeId;';
        return await conn.query(sql);
    }
    catch(err){
        console.log('Failed to count places votes: ', err)
    }
}

async function DeleteVote(userId){
    try{
        const conn = await databaseConnection.connect();
        const sql = 'DELETE FROM voting WHERE fk_userId=?;';
        const values = [userId];
        return await conn.query(sql, values);
    }
    catch(err){
        console.log('Failed to delete place: ', err)
    }
}

module.exports = { RegisterVote, GetVoteByUserId, GetVotes, DeleteVote }