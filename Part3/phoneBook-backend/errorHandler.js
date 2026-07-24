//  an error handler function
export function errorHandler(error, req, res, next) {
    console.error(error.message);
    if (error.name === 'CastError') {
        return res.status(400).json({ error: 'malformed id' });
    }
    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    }
    next(error)
  
}
