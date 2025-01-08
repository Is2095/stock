import { Schema, model } from "mongoose";

const productoSchema = new Schema({
  nombreProducto: {
    type: String,
    required: [true, 'El producto es requerido (DB)'],
    minLength: [2, 'El nombre del producto debe tener al menos dos caracteres'],
    maxLength: [10, 'El nombre del producto debe tener menos de 10 caracteres']
  },
  areaDeUso: {
    type: String,
    default: "uso general"
  },
  marca: {
    type: String,
    default: "sin marca"
  },
  lugarCompra: {
    type: String,
    required: [true, 'Debe ingresar el lugar que fue comprado (DB)'],
    minLength: [3, 'El nombre del local debe tener al menos 3 caracteres'],
    maxLength: [10, 'El nombre del local de compra no debe superar los 10 caracteres (DB)']
  },
  peso: {
    type: Number,
    required: [true, "El peso del producto es necesario (DB)"]
  },
  cantidadBultos: {
    type: Number,
    required: [true, 'La cantidad de producto es necesaria (DB)'],
    min: [0.1, 'la cantidad de producto debe ser mayor a 0'],
    max: [30, 'La cantidad de producto no debe superar las 30 unidades']
  },
  borradoLogico: {
    type: Boolean,
    default: false,
  },
  precioFecha: [
    {
      fecha: { type: Date, required: true },
      precioPorBulto: { type: Number, required: true }
    }
  ]
})
export default model("Producto", productoSchema, "producto");