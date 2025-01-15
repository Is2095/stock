
import ProductoModelo from "../modelos/producto";
import { DatosProductoActualizar } from "../type";

const ActualizarProductoM = async (datos: DatosProductoActualizar) => {
  const { _id, peso, precioProducto, cantidadBultos, lugarCompra, marca, areaDeUso, nombreProducto, compra } = datos;

  let datosAActualizar = {};
  let fieldsAll = "_id";

  if (precioProducto) {
    datosAActualizar = { ...datosAActualizar, $push: { precioFecha: { fecha: Date(), precioPorBulto: precioProducto } } }
    fieldsAll = fieldsAll + ' - precioFecha';
  }
  
  if(peso) {
    datosAActualizar = {...datosAActualizar, peso};
    fieldsAll = fieldsAll + ' - peso';
  }
  if(cantidadBultos) {
    const cantidadDeBultosASumarORestar = compra ? cantidadBultos : -cantidadBultos;
     datosAActualizar = {...datosAActualizar, $inc: {cantidadBultos: cantidadDeBultosASumarORestar}};
     fieldsAll = fieldsAll + ' - cantidadBultos';
  }
  if(lugarCompra) { 
    datosAActualizar = {...datosAActualizar, lugarCompra};
    fieldsAll = fieldsAll + ' - lugarCompra';
  }
  if(marca) {
    datosAActualizar = {...datosAActualizar, marca};
    fieldsAll = fieldsAll + ' - marca';
  }
  if(areaDeUso) {
    datosAActualizar = {...datosAActualizar, areaDeUso};
    fieldsAll = fieldsAll + ' - areaDeUso';
  }
  if(nombreProducto) {
    datosAActualizar = {...datosAActualizar, nombreProducto};
    fieldsAll = fieldsAll + ' - nombreProducto';
  }
  const produc = await ProductoModelo.findOneAndUpdate(
    { _id },
    datosAActualizar,
    { new: true, fields: `${fieldsAll}` }
)

return produc;

}

export default ActualizarProductoM;