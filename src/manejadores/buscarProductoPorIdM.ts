
import { ClienteError } from "../manejadorDeErrores";
import ProductoModelo from "../modelos/producto";

const BuscarProductoPorIdM = async (id: String) => {

  const productoPorId = await ProductoModelo.findOne({ _id: id }).lean();
  if(!productoPorId) {
    throw new ClienteError("Producto no encontrado", 404)
  }

  const productoConFechaLocal = {
    ...productoPorId,
    precioFecha: productoPorId?.precioFecha.map((pf) => ({
      precioPorBulto: pf.precioPorBulto,
      fecha: new Date(pf.fecha).toLocaleString("es-AR", {
        timeZone: "America/Argentina/Buenos_Aires",  
        hour12: false,
        day: "2-digit",   
        month: "2-digit", 
        year: "numeric",  
        hour: "2-digit",   
        minute: "2-digit", 
        // second: "2-digit" 
      })
    }))
  }
  return productoConFechaLocal;
};
export default BuscarProductoPorIdM;