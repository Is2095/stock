
import { Request, Response } from "express";
import { ClienteError, ManejadorErroresGenerales } from "../manejadorDeErrores";

const PruebaValidatorM = (req: Request, res: Response) => {
  const data = req.body;
  throw new ClienteError("error mio", 404);
  res.status(200).json({error: false, message: "", dato: data})
}
const PruebaValidator = ManejadorErroresGenerales(PruebaValidatorM);
 
export default PruebaValidator; 