const voteRepository = require('../repository/voteRepository');

async function RegisterVote(placeId, userId){
    try{
        const vote = await voteRepository.GetVoteByUserId(userId);

        if(vote.length > 0) throw {message: "User already voted.", description: "Usuário já realizou seu voto." }

        await voteRepository.RegisterVote(placeId, userId);
        return
    } 
    catch(err){
        throw err
    }
}

async function GetVotes(){
    try{
        const votes = await voteRepository.GetVotes();
        if(votes.length < 0) throw {status: 404, message: "Votes not found."}

        return votes
    } 
    catch(err){
        if(err.message) throw err
        throw { message: 'Error searching votes.' }
    }
}

async function GetVoteByUserId(userId){
    try{
        const votes = await voteRepository.GetVoteByUserId(userId);
        if(votes.length < 0) throw {status: 404, message: "User vote not fount."}

        return votes
    } 
    catch(err){
        throw err
    }
}

async function DeleteVote(userId){
    try{
        const vote = await voteRepository.GetVoteByUserId(userId);
        
        if(vote == undefined) throw { message: 'Error when deleting vote.' }

        await voteRepository.DeleteVote(userId);
    } 
    catch(err){
        throw { message: 'Error when deleting place.' }
    }
}

module.exports = { RegisterVote, GetVotes, GetVoteByUserId, DeleteVote }