import createError from 'http-errors';

export function errorHandlerMiddleware(err, req, res, next) {
  if (err instanceof createError.HttpError) {
    res.status(err.statusCode).json({
      message: err.message,
      success: false
    });
  } else {
    res.status(500).json({
      message: err.message || 'Internal Server Error',
      success: false
    });
  }
}