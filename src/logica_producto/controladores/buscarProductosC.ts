
import { Request, Response } from "express";
import RespuestaAlFrontend from "../../utils/respuestaAlFrontend";
import { BuscarTodosLosProductoM } from "../manejadores/index";

const BuscarProductosC = async (_req: Request, res: Response) => {
   
  
   const productoBuscado = await BuscarTodosLosProductoM();

   return RespuestaAlFrontend(res, 200, "", productoBuscado, false);
};
export default BuscarProductosC;