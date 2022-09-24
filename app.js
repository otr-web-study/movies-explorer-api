const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const {
  PORT, MONGO_ADDR, MONGO_PORT, DB_NAME,
} = require('./config/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const centralizedErrorHandler = require('./middlewares/centralizedErrorHandler');
const rateLimiter = require('./middlewares/rateLimiter');
const router = require('./routes');

const app = express();
mongoose.connect(`mongodb://${MONGO_ADDR}:${MONGO_PORT}/${DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch((err) => console.log(err));

app.use(requestLogger);
app.use(rateLimiter);
app.use(cors);
app.use(bodyParser.json());
app.use(helmet());

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(centralizedErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
