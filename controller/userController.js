const userService = require('../service/userService');

async function RegisterUser(req, res){
    try{
        await userService.RegisterUser(req.body.username, req.body.password, req.body.confirmPassword);
        return res.status(200).json({message: 'User successfully registered.'})
    } catch(err){
        return res.status(400).json({auth: false, message: err.message, description: err.description})
    }
}

module.exports = { RegisterUser }