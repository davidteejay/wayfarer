const status = 'error';

export const serverError = (req, res, error = 'Internal Server Error') => res.status(500).send({
  status,
  error,
});

export const invalidTokenError = (req, res, error = 'Invalid Access Token') => res.status(401).send({
  status,
  error,
});

export const noTokenError = (req, res, error = 'No Access Token') => res.status(401).send({
  status,
  error,
});

export const inCorrectRouteError = (req, res, error = 'Incorrect Route') => res.status(500).send({
  status,
  error,
});

export const notFoundError = (req, res, error = 'Not Found') => res.status(404).send({
  status,
  error,
});
