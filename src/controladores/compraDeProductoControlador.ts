
import {  Request, Response } from "express";
import { CompraDeProductoM } from "../manejadores/index";
import RespuestaAlFrontend from "../utils/respuestaAlFrontend";

const CompraDeProducto = async (req: Request, res: Response) => {
  const datosProductoAGuardar = req.body;
  const productoGuardo = await CompraDeProductoM(datosProductoAGuardar)
  return RespuestaAlFrontend(res, 201, "", productoGuardo, false)
}
export default CompraDeProducto;