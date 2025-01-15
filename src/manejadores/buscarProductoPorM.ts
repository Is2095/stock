
import ProductoModelo from "../modelos/producto";

type DatosDeBusqueda = {
  key: string,
  value: string | number | boolean
}

const BuscarProductoPorM = async (datosDeBusqueda: DatosDeBusqueda) => {
  const {key, value} = datosDeBusqueda;

  const query = {[key]: value};

  const resultadoBusqueda = await ProductoModelo.find(query)
  return resultadoBusqueda;
  
}

export default BuscarProductoPorM;