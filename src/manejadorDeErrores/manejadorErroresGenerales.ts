
import { NextFunction, Request, Response } from "express";

const ManejadorErroresGenerales = (fn: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    fn(req, res).catch((error: any) => next(error))
  };
};
export default ManejadorErroresGenerales;