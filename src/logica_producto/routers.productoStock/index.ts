import { Router } from "express";
import { ManejadorErroresGenerales } from "../../manejadorDeErrores/index";
import validacionesPost from "../../validaciones/validarProducto";
import { BuscarProductoC, BuscarProductoPorC, BuscarProductoPorIdC, BuscarProductosC, CompraDeProductoC } from "../controladores";

const routerProductosStock = Router();

routerProductosStock.get('/buscarProducto', ManejadorErroresGenerales(BuscarProductoC))
routerProductosStock.get("/", ManejadorErroresGenerales(BuscarProductosC));
routerProductosStock.get("/:id", ManejadorErroresGenerales(BuscarProductoPorIdC));
routerProductosStock.post('/producto', validacionesPost(), ManejadorErroresGenerales(CompraDeProductoC));
// router.post('/prueba', validacionesPost(), PruebaValidator)
routerProductosStock.post('/buscarPor', ManejadorErroresGenerales(BuscarProductoPorC));


export default routerProductosStock;