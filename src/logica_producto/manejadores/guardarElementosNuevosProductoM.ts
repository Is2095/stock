
import ElementosProductoModelo from "../../modelos/elementosProductos";
import { ElementosProducto } from "../../type";

const GuardarElementoNuevoProductoM = async (datos: ElementosProducto) => {
  const { nombreProducto, areaDeUso, marca, lugarCompra, peso, unidadPeso, } = datos;

  let elementosProductosGuardados = await ElementosProductoModelo.findOne();

  if(!elementosProductosGuardados) {
    elementosProductosGuardados = new ElementosProductoModelo({});
  }

  if(!elementosProductosGuardados?.producto.includes(nombreProducto.toUpperCase())) {
    elementosProductosGuardados?.producto.push(nombreProducto.toUpperCase());
  }
  if(areaDeUso && !elementosProductosGuardados?.areaDeUso.includes(areaDeUso?.toUpperCase())) {
    elementosProductosGuardados?.areaDeUso.push(areaDeUso.toUpperCase());
  }
  if(marca && !elementosProductosGuardados?.marca.includes(marca.toUpperCase())) {
    elementosProductosGuardados?.marca.push(marca.toUpperCase());
  }
  if(lugarCompra && !elementosProductosGuardados?.lugarCompra.includes(lugarCompra.toUpperCase())){
    elementosProductosGuardados?.lugarCompra.push(lugarCompra.toUpperCase());
  }
  if(peso && !elementosProductosGuardados?.peso.includes(peso)){
    elementosProductosGuardados?.peso.push(peso);
  }
  if(unidadPeso && !elementosProductosGuardados?.unidadPeso.includes(unidadPeso.toUpperCase())) {
    elementosProductosGuardados?.unidadPeso.push(unidadPeso.toUpperCase());
  }

  await elementosProductosGuardados?.save();
  
}

export default GuardarElementoNuevoProductoM;