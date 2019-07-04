const status = 'error';

export const serverError = (req, res, error = 'Internal Server Error') => res.send({
  status,
  error,
});

export const invalidTokenError = (req, res, error = 'Invalid Access Token') => res.send({
  status,
  error,
});

export const noTokenError = (req, res, error = 'No Access Token') => res.send({
  status,
  error,
});

export const inCorrectRouteError = (req, res, error = 'Incorrect Route') => res.send({
  status,
  error,
});
