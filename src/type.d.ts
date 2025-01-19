import { ObjectId, TypeExpressionOperatorReturningObjectId } from "mongoose"

export interface Producto {
  _id: types.ObjectId
  nombreProducto: string
  tipo?: string
  areaDeUso?: string
  marca?: string
  lugarCompra: string
  peso: number
  unidadPeso: string
  cantidadBultos: number
  borradoLogico?: boolean
  precioProducto: number
}
export interface DatosProductoActualizar {
  _id: Types.ObjectId
  nombreProducto?: string
  tipo?: string
  areaDeUso?: string
  marca?: string
  lugarCompra?: string
  peso?: number
  unidadPeso?: string
  cantidadBultos:? number
  borradoLogico?: boolean
  precioProducto?: number
  compra?: boolean
}
export interface ElementosProducto{
  nombreProducto: string
  areaDeUso: string
  marca: string
  lugarCompra: string
  peso: number
  unidadPeso: string
}

export interface Pedido {
  nombreComrador: string
  tipoDeProducto: string
  cantidad: number
  fechaDePedido?: Date
  fechaDeEntrega: Date
  entregado?: boolean
}