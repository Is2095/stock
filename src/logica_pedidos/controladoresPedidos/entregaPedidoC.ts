import { Request, Response } from "express";
import RespuestaAlFrontend from "../../utils/respuestaAlFrontend";
import { EntregaDePedidoM, PromedioPedidosM } from "../manejadorPedido";
import { ClienteError } from "../../manejadorDeErrores";

const EntregaDePedidoC = async (req: Request, res: Response) => {
  const idCompradorPedido = req.body;
  const respuestaEntregaPedido = await EntregaDePedidoM(idCompradorPedido);

  if (respuestaEntregaPedido.actualizado && respuestaEntregaPedido.documentosActualizados === 1) {
    const promedioHecho = await PromedioPedidosM(idCompradorPedido);

    if (!promedioHecho) {
      throw new ClienteError("Error al guardar datos para estadística", 500);
    }
    return RespuestaAlFrontend(res, 200, "", promedioHecho, false);
  }
}

export default EntregaDePedidoC;