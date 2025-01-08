
import { Request, Response } from "express";
import { ManejadorErroresGenerales } from "../manejadorDeErrores/index";
import { CompraDeProductoM } from "../manejadores/index";

const CompraDeProductoC = async (req: Request, res: Response) => {

  const datosProductoAGuardar = req.body;
  const productoGuardo = await CompraDeProductoM(datosProductoAGuardar);
  return res.status(201).json({ error: false, message: "", dato: productoGuardo });
}
const CompraDeProducto = ManejadorErroresGenerales(CompraDeProductoC);
export default CompraDeProducto;