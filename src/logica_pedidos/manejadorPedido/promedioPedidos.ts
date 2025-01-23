import { ClienteError } from "../../manejadorDeErrores";
import PedidosModelo from '../../modelos/pedidos';
import PromedioPedidosModelo from "../../modelos/promedioDePedidos";
import { IdCompradorPedidos } from "../../type";

const PromedioPedidosM = async (idCompradorPedido: IdCompradorPedidos) => {

  const { idComprador, idPedido } = idCompradorPedido;

  const pedido = await PedidosModelo.findOne(
    {
      _id: idComprador,
      "pedidos._id": idPedido,
    },
    {
      "pedidos.$": 1,
      nombreComprador: 1
    }
  );

  if (!pedido) {
    throw new ClienteError("Pedido no existente para este comprador", 404)
  } else if (pedido && pedido.pedidos[0].entregado == false) {
    throw new ClienteError("El pedido todavía no se entregó", 404)
  } else {
    const compradorPedidoPromedio = await PromedioPedidosModelo.findOne({
      nombreComprador: pedido.nombreComprador,
      producto: pedido.pedidos[0].tipoDeProducto
    })

    if (compradorPedidoPromedio == null) {

      const diferencia = (new Date().getTime()) - (new Date(pedido.pedidos[0].fechaDeEntrega).getTime());
      const diferenciaDeDias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

      const datosNuevosPromedio = {
        nombreComprador: pedido.nombreComprador,
        cantidadDePedidosEntregados: 1,
        producto: pedido.pedidos[0].tipoDeProducto,
        cantidadPromedio: pedido.pedidos[0].cantidad,
        diasPromedioPedido: diferenciaDeDias,
        ultimaFechaEntrega: pedido.pedidos[0].fechaDeEntrega
      }
      const primerPromedioGuardado = new PromedioPedidosModelo(datosNuevosPromedio)
      const elementoGuardado = await primerPromedioGuardado.save();
      return elementoGuardado;
    } else {

      const fechaGuardadaEnPromedio = new Date(compradorPedidoPromedio.ultimaFechaEntrega)
      const fechaGuardadaEnPedido = new Date(pedido.pedidos[0].fechaDeEntrega)
      const comparacionFechas =
        fechaGuardadaEnPromedio.getFullYear() === fechaGuardadaEnPedido.getFullYear() &&
        fechaGuardadaEnPromedio.getMonth() === fechaGuardadaEnPedido.getMonth() &&
        fechaGuardadaEnPromedio.getDate() === fechaGuardadaEnPedido.getDate()

      if (!comparacionFechas) {
        const diferenciaFechas = (new Date(pedido.pedidos[0].fechaDeEntrega).getTime()) - (new Date(compradorPedidoPromedio.ultimaFechaEntrega).getTime());
        const diferenciaDiasActual = Math.floor(diferenciaFechas / (1000 * 60 * 60 * 24))
        const promedioDiasNuevo = (diferenciaDiasActual + compradorPedidoPromedio.diasPromedioPedido) / 2
        const datosPromedios = {
          cantidadDePedidosEntregados: (compradorPedidoPromedio.cantidadDePedidosEntregados + 1),
          cantidadPromedio: ((compradorPedidoPromedio.cantidadPromedio + pedido.pedidos[0].cantidad) / 2),
          ultimaFechaEntrega: pedido.pedidos[0].fechaDeEntrega,
          diasPromedioPedido: promedioDiasNuevo
        }
        const actualizacion = await PromedioPedidosModelo.findOneAndUpdate(
          { _id: compradorPedidoPromedio._id },
          { $set: datosPromedios },
          { new: true, runValidators: true }
        )
        return actualizacion;
      } else {
        throw new ClienteError("El promedio con estos datos ya fue realizado", 400)
      }
    }
  }
}

export default PromedioPedidosM