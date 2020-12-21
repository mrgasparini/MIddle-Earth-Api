const app = require('./config/express');
require('dotenv').config();

app.listen(process.env.API_PORT, () => {
    console.log(`API Server started and listening on port ${process.env.API_URL}:${process.env.API_PORT} (${process.env.ENVIRONMENT})`
    );
});

module.exports = app;