
import { ClienteError } from '../../manejadorDeErrores';
import PedidosModelo from '../../modelos/pedidos';
import { IdCompradorPedidos } from '../../type';

const EntregaDePedidoM = async (idCompradorPedidos: IdCompradorPedidos) => {

const {idComprador, idPedido} = idCompradorPedidos;

  const encontrarPedido = await PedidosModelo.findOne(
    {
      _id: idComprador,
      "pedidos._id": idPedido,
    },
    {
      "pedidos.$": 1,
    }
  );
  if (!encontrarPedido) {
    throw new ClienteError("Pedido no existente para este comprador", 404)
  } else if (encontrarPedido && encontrarPedido.pedidos[0].entregado == true) {
    throw new ClienteError("Pedido ya entregado", 404)
  } else {
    const pedidoEncontrado = await PedidosModelo.updateOne(
      {
        _id: idComprador,
        "pedidos._id": idPedido
      },
      {
        $set: {
          "pedidos.$.fechaDeEntrega": new Date(),
          "pedidos.$.entregado": true
        }
      }
    )

    if (pedidoEncontrado.modifiedCount === 0) {
      throw new ClienteError("No se pudo actualizar el pedido", 400)
    }
    return {actualizado: pedidoEncontrado.acknowledged, documentosActualizados: pedidoEncontrado.modifiedCount};
  }
}
export default EntregaDePedidoM;