const placeService = require('../service/placeService');
const placeRepository = require('../repository/placeRepository');
const Place = require('../model/place');

async function RegisterPlace(req, res){
    try{
        
        if(req.body.place.photoType !== "URL" && req.body.place.photoType !== "IMG")  throw { message: 'Invalid input.'}

        if(req.body.place) {
            const placeRequest = req.body.place;
    
            const place = {};
            place.name = placeRequest.name;
            place.photo = placeRequest.photo;
            place.photoType = placeRequest.photoType;
            place.photoUrl = placeRequest.photoUrl;
    
            await placeService.RegisterPlace(place);
            return res.status(200).json({message: 'Place successfully registered.'})
        }
        throw { message: 'Invalid input.'}
    } catch(err){
        return res.status(400).json({auth: false, message: err.message, description: err.description})
    }
}

async function UpdatePlace(req, res){
    try{
        if(req.body.place === undefined) throw { message: 'Invalid input.'}

        if(req.body.place.photoType !== "URL" && req.body.place.photoType !== "IMG")  throw { message: 'Invalid input.'}

        await placeService.UpdatePlace(req.body.place);
        return res.status(200).json({message: 'Place successfully updated.'})
    } catch(err){
        return res.status(400).json({auth: false, message: err.message, description: err.description})
    }
}

async function DeletePlace(req, res){
    try{
        if(req.params.id === undefined) throw { message: 'Invalid input.'}

        await placeService.DeletePlace(req.params.id);
        return res.status(200).json({message: 'Place successfully deleted.'})
    } catch(err){
        return res.status(400).json({auth: false, message: err.message, description: err.description})
    }
}

async function GetAllPlaces(req, res){
    try{
        const response = await placeRepository.GetAllPlaces();
        const places = response[0];
        return res.status(200).json({places});
    } catch(err){
        return res.status(400).json({auth: false, message: err.message, description: err.description})
    }
}

module.exports = { RegisterPlace, UpdatePlace, DeletePlace, GetAllPlaces }