
import { Request, Response } from "express";
import { BuscarProductoPorIdM } from "../manejadores";
import RespuestaAlFrontend from "../utils/respuestaAlFrontend";

const BuscarProductoPorIdC = async (req: Request, res: Response) => {

  const { id } = req.params;

  const productoBuscado = await BuscarProductoPorIdM(id)  

  return RespuestaAlFrontend(res, 200, "", productoBuscado, false);

};
export default BuscarProductoPorIdC;