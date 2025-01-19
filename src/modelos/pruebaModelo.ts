import { Schema, model } from "mongoose";
const pedidoSchema = new Schema({
  tipoDeProducto: {
    type: String,
    required: [true, 'El tipo de producto es requerido (DB)'],
    trim: true,
  },
  cantidad: {
    type: Number,
    min: [0.1, 'La número de producto pedido debe ser mayor a 0'],
    default: 0
  },
  fechaDePedido: {
    type: Date,
    default: Date.now
  },
  fechaDeEntrega: {
    type: Date,
    default: () => {
      const ahora = new Date();
      return new Date(ahora.setDate(ahora.getDate() + 1));
    },
  },
  entregado: {
    type: Boolean,
    default: false
  },
})

const pruebasPedidosSchema = new Schema({
  nombreComprador: {
    type: String,
    required: [true, 'El nombre del comprador es requerido (DB)'],
    minLength: [2, 'El nombre debe tener al menos dos caracteres'],
    maxLength: [20, 'El nombre debe tener menos de 20 caracteres'],
    trim: true
  },
  pedidos: [pedidoSchema]
});

export default model("PruebasPedi", pruebasPedidosSchema, "pruebasPedi");
