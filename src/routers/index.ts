import { Router } from "express";
import { CompraDeProducto, BuscarProductos, BuscarProductoPorId } from "../controladores/index";

const router = Router();

router.get("/", BuscarProductos);
router.get("/:id", BuscarProductoPorId);
router.post('/producto', CompraDeProducto);

export default router;