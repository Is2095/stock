import { Router } from "express";
import { CompraDeProducto, BuscarProductos, BuscarProductoPorId } from "../controladores/index";
// import PruebaValidator from "../controladores/prueba";
import validacionesPost from "../validaciones/validar";
import { ManejadorErroresGenerales } from "../manejadorDeErrores/index";

const router = Router();

router.get("/", BuscarProductos);
router.get("/:id", BuscarProductoPorId);
router.post('/producto',validacionesPost(), ManejadorErroresGenerales(CompraDeProducto));
router.post('/prueba', validacionesPost())

export default router;