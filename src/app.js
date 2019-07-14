/* eslint-disable no-unused-vars */
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import debug from 'debug';
import swaggerUI from 'swagger-ui-express';
import path from 'path';

import swaggerDoc from './config/swagger.json';
import indexRoutes from './routes/indexRoutes';
import returnError from './helpers/errorHandler';

dotenv.config();

const app = express();
const port = process.env.PORT;
const deBug = debug('wayfarer:server');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use('/api/v1/', indexRoutes);
app.use('/*', (req, res) => returnError(res, 'Incorrect Route', 404));
app.use((err, req, res, next) => res.send({
  status: 'error',
  message: err.message,
}));

app.listen(port, () => deBug(`Listening on port ${port}`));

export default app;
