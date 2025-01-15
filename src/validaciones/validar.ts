
import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";

const validacionesPost = () => {
 
  return [
    check("nombreProducto")
      .trim()
      .notEmpty().withMessage("El nombre del producto es requerido")
      .isString().withMessage("Este campo solo admite string")
      .isLength({ min: 2, max: 10 }).withMessage("El nombre del producto debe tener entre 2 y 10 caracteres")
      .escape()
      .customSanitizer(value => value.toUpperCase()),
    check("areaDeUso")
      .trim()
      .isString().withMessage("Este campo solo admite string")
      .customSanitizer(value => value.toUpperCase()),
    check("marca")
      .trim()
      .isString().withMessage("Este campo solo admite string")
      .customSanitizer(value => value.toUpperCase()),
    check("lugarCompra")
      .trim()
      .notEmpty().withMessage("El lugar de compra del producto es requerido")
      .isString().withMessage("Este campo solo admite string")
      .isLength({ min: 3, max: 50 }).withMessage("El lugar de compra del producto debe tener entre 3 y 50 caracteres")
      .customSanitizer(value => value.toUpperCase()),
    check("peso")
      .exists({ checkFalsy: true }).withMessage('El peso del producto es requerido.')
      .isNumeric().withMessage("la edad debe ser un número")
      .isFloat({ min: 0.1, max: 120 }).withMessage('El peso debe ser un número entero.'),
    check("unidadPeso")
      .trim()
      .notEmpty().withMessage("La unidad de peso del producto es requerido")
      .isString().withMessage("La unidad del peso del producto es requerido")
      .customSanitizer(value => value.toUpperCase()),
    check("cantidadBultos")
      .exists({ checkFalsy: true }).withMessage('La cantidad de productos comprados es requerido.')
      .isNumeric().withMessage("La cantidad de bultos comprados debe ser un número")
      .isFloat({ min: 0.1, max: 30 }).withMessage("La cantidad de bultos comprados debe ser un número entre 0.1 y 30"),

    (req: Request, _res: Response, next: NextFunction) => {
      const errores = validationResult(req);
      if (!errores.isEmpty()) {
        const checkError = errores.array().map(err => err.msg);
        return next({message: checkError, statusCode: 408});
      }
      next();
    }
  ]
}
export default validacionesPost;