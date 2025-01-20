import { Request, Response } from "express";
import RespuestaAlFrontend from "../../utils/respuestaAlFrontend";
import { GuardarPedidoM } from "../manejadorPedido";

const GuardarPedidoC = async (req: Request, res: Response) => {
  const datosPedidos = req.body;
  const pedidoGuardado = await GuardarPedidoM(datosPedidos);
  return RespuestaAlFrontend(res, 201, "Pedido agendado", pedidoGuardado, false);
}

export default GuardarPedidoC