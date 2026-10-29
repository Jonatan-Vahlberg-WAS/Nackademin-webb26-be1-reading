

/**
 * A middleware to log the request to the console
 * @param {import('express').Request} req - The request object
 * @param {import('express').Response} res - The response object
 * @param {import('express').NextFunction} next - The next function
 */
export function logRequest(req, res, next) {
    const date = new Date().toISOString();
    const time = date.split('T')[1].split('.')[0];
    console.log(`${req.method}: ${req.url} - ${time}`);
    next();
}