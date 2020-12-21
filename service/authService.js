const userRepository = require('../repository/userRepository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function ValidateLogin (username, password) {
    const response = await userRepository.getUserByUsername(username);
    const user = response[0];
    if(user.length > 0)
    {
        const match = await bcrypt.compare(password, user[0].password);
        if(match){
            const userId = user[0].id;
            const token = jwt.sign({ userId }, process.env.SECRET, {
                expiresIn: 3600000 // expires in 3 hours
              });
            return { token: token, username: username }
        }
    }
    throw ({status: 400, message: 'Invalid username or password.' , description: "Usuário ou Senha incorretos."})
}

  async function VerifyAuthorization(req, res, next){
      try{
        const token = req.headers['x-access-token'];
        if (token === undefined) return res.status(403).json({ auth: false, message: 'Failed to authenticate.' });

        const decoded = jwt.decode(token, process.env.SECRET);
        req.userId = decoded.userId;
        next();
      }catch(error){
          throw res.status(403).json({ auth: false, message: 'Failed to authenticate.' })
      }
  }

  module.exports = { ValidateLogin, VerifyAuthorization }