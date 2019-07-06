const status = 'error';

export default (res, error, statusCode) => res.status(statusCode).send({
  status,
  error,
});
