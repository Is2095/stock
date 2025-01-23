
import { Schema, model } from "mongoose";

const promedioPedidosSchema = new Schema({

  nombreComprador: {
    type: String,
    required: true,
    trim: true
  },
  cantidadDePedidosEntregados: {
    type: Number,
    required: true
  },
  producto: {
    type: String,
    required: true,
    trim: true
  },
  cantidadPromedio: {
    type: Number,
    required: true,
  },
  diasPromedioPedido: {
    type: Number,
    required: true,
    trim: true,
    default: 0
  },
  ultimaFechaEntrega: {
    type: Date,
    required: true,
    default: Date()
  }

})

export default model("PromedioPedidosModelo", promedioPedidosSchema, "promedioPedidosModelo");