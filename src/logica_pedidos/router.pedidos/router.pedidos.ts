import { Router } from "express";
import PruebaValidator from "../controladoresPedidos/prueba";
import { EntregaDePedidoC, GuardarPedidoC } from "../controladoresPedidos";
import { ManejadorErroresGenerales } from "../../manejadorDeErrores";
import validarcionesGuardarPedido from "../../validaciones/validarPedido";

const routerPedidos = Router();

routerPedidos.post('/prueba', PruebaValidator)
routerPedidos.post('/guardarPedido', validarcionesGuardarPedido(), ManejadorErroresGenerales(GuardarPedidoC));
routerPedidos.post('/entregaPedido', ManejadorErroresGenerales(EntregaDePedidoC));

export default routerPedidos;