
import { Producto } from "../type";
import ProductoModelo from "../modelos/producto";
import ActualizarProducto from "./actualizacionProductoManejador";
import GuardarElementoNuevoProductoM from "./guardarElementosNuevosProducto";

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
    
    const datosAGuardar = {
      precioFecha: { fecha: Date(), precioPorBulto: precioProducto },
      ...restoDatos
    }
    
    const productoNuevoAGuardar = new ProductoModelo(datosAGuardar);
    const productoNuevoGuardado = await productoNuevoAGuardar.save();

    const elementos = {
      nombreProducto: productoNuevoAGuardar.nombreProducto,
      areaDeUso: productoNuevoAGuardar.areaDeUso,
      marca: productoNuevoAGuardar.marca,
      lugarCompra: productoNuevoAGuardar.lugarCompra,
      peso: productoNuevoAGuardar.peso,
      unidadPeso: productoNuevoAGuardar.unidadPeso
    }

    await GuardarElementoNuevoProductoM(elementos);

    return productoNuevoGuardado;
  }
};

export default CompraDeProductoM;