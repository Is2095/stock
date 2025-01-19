import { NextFunction, Request, Response } from "express"
import { check, validationResult } from "express-validator";
import { ClienteError } from "../manejadorDeErrores";

const validarcionesGuardarPedido = () => {
  return [
    check("nombreComprador")
      .trim()
      .notEmpty().withMessage("El nombre del comprador es requerido")
      .isString().withMessage("Este campo solo admite string")
      .isLength({ min: 2, max: 20 }).withMessage("El nombre del comprador debe tener entre 2 y 20 caracteres")
      .escape()
      .customSanitizer(value => value.toUpperCase()),
    check("tipoDeProducto")
      .trim()
      .notEmpty().withMessage("El tipo de producto es requerido")
      .isString().withMessage("Este campo solo admite string")
      .isLength({ min: 3, max: 20 }).withMessage("El tipo de producto debe tener entre 3 y 20 caracteres")
      .customSanitizer(value => value.toUpperCase()),
    check("cantidad")
      .exists({ checkFalsy: true }).withMessage('La cantidad de producto pedido es requerido.')
      .isNumeric().withMessage("la producto debe ser un número")
      .isFloat({ min: 1 }).withMessage('La cantidad debe ser mayor a 1'),
    check("fechaDePedido")
      .optional({ nullable: true, checkFalsy: true })
      .isISO8601().withMessage("La fecha debe tener un formato válido")
      .custom((value) => {
        console.log(value, " fecha pedido del frondend");

        const diaEntrada = new Date(value);
        const diaHoy = new Date();
        diaHoy.setHours(0, 0, 0, 0);
        if (diaEntrada < diaHoy) {
          throw new ClienteError("La fecha no puede ser anterior a la fecha actual")
        }
        return true;
      }),
    check("fechaDeEntrega")
      .optional({ nullable: true, checkFalsy: true })
      .isISO8601().withMessage("La fecha debe tener un formato válido")
      .custom((value) => {
        console.log(value, " fecha de emtrega del frontend");

        const diaEntrada = new Date(value);
        const diaHoy = new Date();
        diaHoy.setHours(0, 0, 0, 0);
        const dosMesesDespues = new Date()
        dosMesesDespues.setMonth(diaHoy.getMonth() + 2);
        dosMesesDespues.setHours(0, 0, 0, 0);
        if (diaEntrada < diaHoy) {
          throw new ClienteError("La fecha no puede ser anterior a la fecha actual")
        }
        if (diaEntrada > dosMesesDespues) {
          throw new ClienteError("La fecha de entrega no puede superar los dos meses de la fecha actual")
        }
        return true;
      }),

    (req: Request, _res: Response, next: NextFunction) => {
      const errores = validationResult(req);
      if (!errores.isEmpty()) {
        const checkError = errores.array().map(err => err.msg);
        return next({ message: checkError, statusCode: 408 })
      }
      next();
    }
  ]
}

export default validarcionesGuardarPedido;