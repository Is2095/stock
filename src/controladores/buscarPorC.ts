
import { Request, Response } from "express"
import { ClienteError } from "../manejadorDeErrores";
import BuscarProductoPorM from "../manejadores/buscarProductoPorM";
import RespuestaAlFrontend from "../utils/respuestaAlFrontend";

const BuscarProductoPorC = async (req: Request, res: Response) => {

  const {key, value} = req.body; 

  if(!key || !value) {
    throw new ClienteError("Parámetros faltantes");
  }

  const resultado = await BuscarProductoPorM({key, value});

  return RespuestaAlFrontend(res, 200, "", resultado, true);
  
}

export default BuscarProductoPorC;