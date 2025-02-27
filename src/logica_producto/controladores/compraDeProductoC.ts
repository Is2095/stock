
import { Request, Response } from "express";
import RespuestaAlFrontend from "../../utils/respuestaAlFrontend";
import { CompraDeProductoM } from "../manejadores/index";

const CompraDeProductoC = async (req: Request, res: Response) => {
  const datosProductoAGuardar = req.body;
  const productoGuardo = await CompraDeProductoM(datosProductoAGuardar);

  return RespuestaAlFrontend(res, 201, "", productoGuardo, false);
}
export default CompraDeProductoC;