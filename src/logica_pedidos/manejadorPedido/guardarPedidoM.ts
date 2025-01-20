import { ClienteError } from "../../manejadorDeErrores";
import PedidosModelo from "../../modelos/pedidos";
import { Pedido } from "../../type";

const GuardarPedidoM = async (datosPedidoAGuardar: Pedido) => {
  const { nombreComprador, tipoDeProducto, cantidad, fechaDePedido, fechaDeEntrega } = datosPedidoAGuardar;

  const comprador = await PedidosModelo.findOne({ nombreComprador })

  const datosDePedidoAGuardar = {
    tipoDeProducto,
    cantidad,
    fechaDePedido,
    fechaDeEntrega
  };

  if (!comprador) {
    const guardarPedidoNuevo = new PedidosModelo({ pedidos: datosDePedidoAGuardar, nombreComprador });
    const pedidoNuevoGuardado = await guardarPedidoNuevo.save()
    return pedidoNuevoGuardado
  } else {
    const existePedido = comprador.pedidos.some(pedido => pedido.tipoDeProducto === tipoDeProducto && pedido.entregado === false)
    if (existePedido) {
      throw new ClienteError("Hay un pedido en curso, si desea modificarlo debe hacer una actualización de pedido")
    } else {
      const actualizarListaPedidos = await PedidosModelo.findOneAndUpdate(
        { nombreComprador },
        { $push: { pedidos: datosDePedidoAGuardar } },
        { new: true, upsert: true }
      )
      const pedidoUltimoGuardado = actualizarListaPedidos.pedidos[actualizarListaPedidos.pedidos.length - 1 ]
      return {producto: pedidoUltimoGuardado.tipoDeProducto, cantidad: pedidoUltimoGuardado.cantidad, fechaEntrega: pedidoUltimoGuardado.fechaDeEntrega};
    }
  }

}

export default GuardarPedidoM;