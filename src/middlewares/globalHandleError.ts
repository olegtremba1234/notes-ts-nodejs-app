import express from 'express';

const globalErrorHandler = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
};

export default globalErrorHandler;