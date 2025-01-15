
import { Request, Response } from "express";
import { BuscarTodosLosProductoM } from "../manejadores/index";
import RespuestaAlFrontend from "../utils/respuestaAlFrontend";

const BuscarProductosC = async (_req: Request, res: Response) => {
   
  
   const productoBuscado = await BuscarTodosLosProductoM();

   return RespuestaAlFrontend(res, 200, "", productoBuscado, false);
};
export default BuscarProductosC;