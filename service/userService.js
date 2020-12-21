const userRepository = require('../repository/userRepository');
const User = require('../model/user');
const bcrypt = require('bcrypt');

async function RegisterUser(username, password, confirmPassword){
    if(password !== confirmPassword) throw {message: 'Password and confirmation differ.', description: "Senha e confirmação estão divergentes." }
    const response = await userRepository.getUserByUsername(username);
    const user = response[0];
    if(user.length > 0) throw { message: 'User already registered.', description: "Usuário já registrado." };

    await bcrypt.hash(password, 10, async function(err, hash) {
        if (err) throw { message: 'Error registering user.' }
        
        
        await userRepository.registerUser(username, hash);
      });

    if(user.id) return;
}

module.exports = { RegisterUser }