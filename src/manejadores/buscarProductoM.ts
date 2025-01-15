
import ProductoModelo from "../modelos/producto";
import { ClienteError } from "../manejadorDeErrores";

type DatosDeBusqueda = {
  nombreProducto: string | undefined
  tipo?: string | undefined 
}

const BuscarProductoM = async (datosproductoABuscar: DatosDeBusqueda) => {
  
  if (!datosproductoABuscar.nombreProducto) {
    throw new ClienteError("Error al recibir el dato a buscar", 404);
  }
  const productoEncontrado = await ProductoModelo.find(datosproductoABuscar);
  if (!productoEncontrado) {
    throw new ClienteError("Producto no encontrado", 404)
  }
  const datosFiltrados = productoEncontrado.map(producto => {
    const ultimoPrecioFecha =  new Date(producto.precioFecha[producto.precioFecha.length - 1].fecha).toLocaleString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
      hour12: false,
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })

    return {
      id: producto._id,
      nombreProducto: producto.nombreProducto,
      tipo: producto.tipo,
      marca: producto.marca,
      lugarCompra: producto.lugarCompra,
      peso: producto.peso,
      cantidadBultos: producto.cantidadBultos,
      precioFecha: ultimoPrecioFecha
    }
  })
  return datosFiltrados;
}

export default BuscarProductoM;