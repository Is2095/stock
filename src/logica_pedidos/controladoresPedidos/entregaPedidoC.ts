import { Response, Request } from "express";
import RespuestaAlFrontend from "../../utils/respuestaAlFrontend";


const EntregaDePedidoC = (req: Request, res: Response) => {
  const {idComprador, idPedido} = req.body;
  console.log("comprador: ", idComprador);
  console.log("pedido: ", idPedido);
  return RespuestaAlFrontend(res, 200, "", {idComprador, idPedido}, false);
  
  

}

export default EntregaDePedidoC;