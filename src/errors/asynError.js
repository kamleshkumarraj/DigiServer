export const asyncErrorHandler = (method) => (req, res, next) => {
    Promise.resolve(method(req, res, next)).catch(next);
}