
import { Request, Response } from "express";
import { ManejadorErroresGenerales } from "../manejadorDeErrores";
import { BuscarProductoPorIdM } from "../manejadores";

const BuscarProductoPorIdC = async (req: Request, res: Response) => {

  const { id } = req.params;

  const productoBuscado = await BuscarProductoPorIdM(id)

  return res.status(200).json({ error: false, message: "", dato: productoBuscado })
};
const BuscarProductoPorId = ManejadorErroresGenerales(BuscarProductoPorIdC);
export default BuscarProductoPorId;