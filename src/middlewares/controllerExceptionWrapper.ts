import { Request, Response, NextFunction } from 'express';

const controllerExceptionWrapper = (controller: Function) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default controllerExceptionWrapper;
