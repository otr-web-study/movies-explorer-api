require('dotenv').config();

const {
  JWT_SECRET = 'some-secret-key',
  PORT = 3000,
  NODE_ENV = 'develop',
  MONGO_ADDR = 'localhost',
  MONGO_PORT = '27017',
  DB_NAME = 'moviesdb',
} = process.env;

module.exports.secret = JWT_SECRET;
module.exports.PORT = PORT;
module.exports.NODE_ENV = NODE_ENV;
module.exports.MONGO_ADDR = MONGO_ADDR;
module.exports.MONGO_PORT = MONGO_PORT;
module.exports.DB_NAME = DB_NAME;
