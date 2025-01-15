
import { NextFunction, Request, Response } from "express";

const ManejadorErroresGenerales = (fn: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    fn(req, res).catch((error: any) => {
      console.log(error, "dentro del controlador");
      
      next(error)})
  };
};
export default ManejadorErroresGenerales;