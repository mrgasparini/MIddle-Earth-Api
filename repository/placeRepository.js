const databaseConnection = require('./config/database');

async function RegisterPlace(place){
    try{
        const conn = await databaseConnection.connect();
        const sql = 'INSERT INTO middle_earth_places (name, photo, photoType, photoUrl) VALUES (?, BINARY(?), ?, ?);';
        const values = [place.name, place.photo, place.photoType, place.photoUrl];
        return await conn.query(sql, values);
    }
    catch(err){
        console.log('Failed to register a new place: ', err)
    }
}

async function UpdatePlace(place){
    try{
        const conn = await databaseConnection.connect();
        const sql = 'UPDATE middle_earth_places SET name=?, photo=BINARY(?), photoType=?, photoUrl=? WHERE id=?;';
        const values = [place.name, place.photo, place.photoType, place.photoUrl == null ? '' : place.photoUrl, place.id];
        return await conn.query(sql, values);
    }
    catch(err){
        console.log('Failed to update the place: ', err)
    }
}

async function DeletePlace(placeId){
    try{
        const conn = await databaseConnection.connect();
        const sql = 'DELETE FROM middle_earth_places WHERE id=?;';
        const values = [placeId];
        return await conn.query(sql, values);
    }
    catch(err){
        console.log('Failed to delete place: ', err)
    }
}

async function GetAllPlaces(){
    try{
        const conn = await databaseConnection.connect();
        const sql = 'SELECT * FROM middle_earth_places;';
        return await conn.query(sql);
    }
    catch(err){
        console.log('Failed to get all places: ', err)
    }
}

async function GetPlaceById(placeId){
    try{
        const conn = await databaseConnection.connect();
        const sql = 'SELECT * FROM middle_earth_places WHERE id=?;';
        const values = [placeId];
        const response = await conn.query(sql, values);
        return response[0];
    }
    catch(err){
        console.log(`Failed to get place: ${placeId}`, err)
    }
}


module.exports = { RegisterPlace, UpdatePlace, DeletePlace, GetAllPlaces, GetPlaceById }