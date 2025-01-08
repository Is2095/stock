import { ObjectId, TypeExpressionOperatorReturningObjectId } from "mongoose"

export interface Producto {
  nombreProducto: string
  areaDeUso?: string
  marca?: string
  lugarCompra: string
  peso: number
  cantidadBultos: number
  borradoLogico?: boolean
  precioProducto: number
}
export interface DatosProductoActualizar {
  _id: Types.ObjectId
  nombreProducto?: string
  areaDeUso?: string
  marca?: string
  lugarCompra?: string
  peso?: number
  cantidadBultos:? number
  borradoLogico?: boolean
  precioProducto?: number
  compra?: boolean
}