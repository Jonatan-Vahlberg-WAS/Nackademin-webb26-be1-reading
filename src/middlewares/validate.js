/**
 * Validate the request body against the given schema
 * @param {import('zod').ZodType} schema - The schema to validate the request body against
 * @returns {import('express').RequestHandler} - The middleware function
 */
export function validateBody(schema) {
    // A middleware function always return either a  function with 3 arguments (req, res, next) or a promise with the same
    return (req, res, next) => {
        // Zod validates the data and returns a result object with the data and an error object if the validation fails
        //This also strips the data of any unknown properties
        const result = schema.safeParse(req.body);
        // If the validation fails, return a 400 status code with the error message and the issues
        if (!result.success) {
            res.status(400).json({
                error: "Validation failed",
                issues: result.error.issues,
            });
            return;
        }

        // If the validation succeeds, set the request body to the validated data
        req.body = result.data;
        // Call the next middleware function or the route handler
        next();
    };
}

/**
 * Validate the request query against the given schema
 * @param {import('zod').ZodType} schema - The schema to validate the request query against
 * @returns {import('express').RequestHandler} - The middleware function
 */
export function validateQuery(schema) {
    return (req, res, next) => {
        // Zod validates the data and returns a result object with the data and an error object if the validation fails
        //This also strips the data of any unknown properties
        const result = schema.safeParse(req.query);
        // If the validation fails, return a 400 status code with the error message and the issues
        if (!result.success) {
            res.status(400).json({
                error: "Validation failed",
                issues: result.error.issues,
            });
            return;
        }

        // Express 5 exposes req.query through a getter, so replace it on this request
        Object.defineProperty(req, "query", {
            value: result.data,
            writable: true,
            configurable: true,
            enumerable: true,
        });
        // Call the next middleware function or the route handler
        next();
    };
}