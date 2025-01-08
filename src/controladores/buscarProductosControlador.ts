
import { Request, Response } from "express";
import { ManejadorErroresGenerales } from "../manejadorDeErrores";
import { BuscarTodosLosProductoM } from "../manejadores/index";

const BuscarProductosC = async (_req: Request, res: Response) => {
  
   const productoBuscado = await BuscarTodosLosProductoM();

    return res.status(200).json({error: false, message: "", dato:productoBuscado})
};
const BuscarProductos = ManejadorErroresGenerales(BuscarProductosC);
export default BuscarProductos;