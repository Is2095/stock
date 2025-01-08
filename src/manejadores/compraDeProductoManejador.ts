
import { Producto } from "../type";
import ProductoModelo from "../modelos/producto";
import ActualizarProducto from "./actualizacionProductoManejador";

const CompraDeProductoM = async (datosDelProducto: Producto) => {

  const datosProductoParaBusqueda = {
    nombreProducto: datosDelProducto.nombreProducto,
    areaDeUso: datosDelProducto.areaDeUso,
    lugarCompra: datosDelProducto.lugarCompra,
    marca: datosDelProducto.marca
  }
  const productoEncontrado = await ProductoModelo.findOne(datosProductoParaBusqueda);
  if (productoEncontrado != null) {
    const datosDeActualizacion = {
      ...datosDelProducto,
      _id: productoEncontrado._id,
      compra: true
    }
    const productoActualizado = await ActualizarProducto(datosDeActualizacion);
    return productoActualizado; 
  } else {
    const { precioProducto, ...restoDatos } = datosDelProducto;
    const fechaActual = Date();
    console.log(fechaActual, " fecha en guardar producto");
    
    const datosAGuardar = {
      precioFecha: { fecha: Date(), precioPorBulto: precioProducto },
      ...restoDatos
    }
    console.log(datosAGuardar);
    
    const productoNuevoAGuardar = new ProductoModelo(datosAGuardar);
    const productoNuevoGuardado = productoNuevoAGuardar.save();

    return productoNuevoGuardado;
  }
};

export default CompraDeProductoM;