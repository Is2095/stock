import { Router } from "express";
import { CompraDeProductoC, BuscarProductosC, BuscarProductoPorIdC, BuscarProductoPorC, BuscarProductoC } from "../controladores";
import PruebaValidator from "../controladores/prueba";
import validacionesPost from "../validaciones/validar";
import { ManejadorErroresGenerales } from "../manejadorDeErrores/index";

const router = Router();

router.get('/buscarProducto', ManejadorErroresGenerales(BuscarProductoC))
router.get("/", ManejadorErroresGenerales(BuscarProductosC));
router.get("/:id", ManejadorErroresGenerales(BuscarProductoPorIdC));
router.post('/producto', validacionesPost(), ManejadorErroresGenerales(CompraDeProductoC));
router.post('/prueba', validacionesPost(), PruebaValidator)
router.post('/buscarPor', ManejadorErroresGenerales(BuscarProductoPorC));


export default router;