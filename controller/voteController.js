const voteService = require('../service/voteService');

async function RegisterVote(req, res){
    try{
        await voteService.RegisterVote(req.body.placeId, req.userId);
        return res.status(200).json({message: 'Vote successfully registered.'})
    } catch(err){
        if(err.message)
            return res.status(400).json({message: err.message, description: err.description})
        return res.status(400).json({message: 'Error registering vote.'})
    }
}

async function GetVotes(req, res){
    try{
        const votes = await voteService.GetVotes();
        return res.status(200).json({votes})
    } catch(err){
        if(err.status) return res.status(err.status).json({message: err.message, description: err.description})
        return res.status(400).json({message: err.message})
    }
}

async function GetVoteByUserId(req, res){
    try{
        if(req.userId === undefined) throw { message: "Failed to get user votes"}

        const votes = await voteService.GetVoteByUserId(req.userId);
        return res.status(200).json({votes})
    } catch(err){
        if(err.status) return res.status(err.status).json({message: err.message, description: err.description})
        return res.status(400).json({message: err.message})
    }
}

async function DeleteVote(req, res){
    try{
        await voteService.DeleteVote(req.userId);
        return res.status(200).json({message: 'Vote successfully deleted.'})
    } catch(err){
        return res.status(400).json({auth: false, message: err.message})
    }
}

module.exports = { RegisterVote, GetVotes, GetVoteByUserId, DeleteVote }