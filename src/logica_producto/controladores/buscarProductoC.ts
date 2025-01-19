import { Request, Response } from "express";
import RespuestaAlFrontend from "../../utils/respuestaAlFrontend";
import { BuscarProductoM } from "../manejadores";
// import { ClienteError } from "../manejadorDeErrores";

const BuscarProductoC = async (req: Request, res: Response) => {
  const  { producto, tipo }  = req.query;
  
  const productoQuery = typeof producto === "string" ? producto.toUpperCase() : undefined;
  const tipoQuery = typeof tipo === "string" ? tipo.toUpperCase() : undefined;

  const DatosDelproductoABuscar = tipoQuery != undefined ? {nombreProducto: productoQuery, tipo: tipoQuery}: {nombreProducto: productoQuery};
  
  const resultado = await BuscarProductoM(DatosDelproductoABuscar);
  
  return RespuestaAlFrontend(res, 200, "", resultado, false);
}

export default BuscarProductoC; 