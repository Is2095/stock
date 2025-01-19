
import { Request, Response } from "express";
import { ManejadorErroresGenerales } from "../../manejadorDeErrores";
import PruebaPedidos from "../../modelos/pedidos";

const PruebaValidatorM = async (req: Request, res: Response) => {
  const { producto, cantidad, comprador, fechaDeEntrega } = req.body;

  const pedidoExistente = await PruebaPedidos.findOne({ nombreComprador: comprador });

  const pedidoNuevo = {  
    tipoDeProducto: producto,
    cantidad,
    fechaDeEntrega
  }
  
  if (pedidoExistente) {
    const pedidoActualizado = await PruebaPedidos.findOneAndUpdate(
      { nombreComprador: comprador },
      { $push: { pedidos: pedidoNuevo } },
      { new: true, upsert: true }
    )
    res.status(200).json({ error: false, message: "", dato: pedidoActualizado })
  } else {
    const pedidoGuardado = new PruebaPedidos({ pedidos: pedidoNuevo, nombreComprador: comprador });
    const pedidoHecho = pedidoGuardado.save();
    // const pedidosPendiente = await PruebaPedidos.find();
    res.status(200).json({ error: false, message: "", dato: pedidoHecho })
  }

  // throw new ClienteError("error mio", 404);
}
const PruebaValidator = ManejadorErroresGenerales(PruebaValidatorM);

export default PruebaValidator; 