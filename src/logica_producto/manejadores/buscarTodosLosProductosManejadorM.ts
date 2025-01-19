
import { ClienteError } from "../../manejadorDeErrores";
import ProductoModelo from "../../modelos/producto";

const BuscarTodosLosProductoM = async () => {
  const productos = await ProductoModelo.find().lean();

  if(productos.length === 0) {
    throw new ClienteError("No hay productos para mostrar");
  }

  const productosConFechaLocal = productos.map((producto) => ({
    ...producto,
    precioFecha: producto.precioFecha.map((pf) => ({
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
  }))
  return productosConFechaLocal;
};

export default BuscarTodosLosProductoM;