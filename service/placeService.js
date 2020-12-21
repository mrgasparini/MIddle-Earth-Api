const placeRepository = require('../repository/placeRepository');
const Place = require('../model/place');

async function RegisterPlace(place){
    try{
        await placeRepository.RegisterPlace(place);
        return
    } 
    catch(err){
        throw { message: 'Error registering place.', description: "Erro ao cadastrar lugar." }
    }
}

async function UpdatePlace(placeUpdate){
    try{
        const response = await placeRepository.GetPlaceById(placeUpdate.id);
        const place = response[0];

        if(place === undefined) throw { message: 'Error updating place.', description: "Erro ao atualizar lugar."  }

        place.name = placeUpdate.name;
        place.photo = placeUpdate.photo;
        place.photoType = placeUpdate.photoType;
        place.photoUrl = placeUpdate.photoUrl;

        if(place.photoType === "URL") place.photo = '';
        else place.photoUrl = '';
        
        await placeRepository.UpdatePlace(place);
    } 
    catch(err){
        throw { message: 'Error updating place.', description: "Erro ao atualizar lugar."  }
    }
}

async function DeletePlace(placeId){
    try{
        const place = await placeRepository.GetPlaceById(placeId);
        
        if(place == undefined) throw { message: 'Error when deleting place.', description: "Erro ao excluir lugar." }

        await placeRepository.DeletePlace(placeId);
    } 
    catch(err){
        throw { message: 'Error when deleting place.', description: "Erro ao excluir lugar." }
    }
}

module.exports = { RegisterPlace, UpdatePlace, DeletePlace }