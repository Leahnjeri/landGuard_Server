import { Request, Response, NextFunction } from 'express';

// Async handler to catch errors in async route handlers
const asyncHandler = <T = any, R extends Request = Request>(
    fn: (req: R, res: Response<T>, next: NextFunction) => Promise<T>
) => {
    return (req: R, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

export default asyncHandler;