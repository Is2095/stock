import { Router } from "express";
import PruebaValidator from "../controladoresPedidos/prueba";
import { GuardarPedidoC } from "../controladoresPedidos";
import { ManejadorErroresGenerales } from "../../manejadorDeErrores";
import validarcionesGuardarPedido from "../../validaciones/validarPedido";

const routerPedidos = Router();

routerPedidos.post('/prueba', PruebaValidator)
routerPedidos.post('/guardarPedido', validarcionesGuardarPedido(), ManejadorErroresGenerales(GuardarPedidoC));

export default routerPedidos;