import { Schema, model } from "mongoose";

const elementosProductoSchema = new Schema({
  producto: [
    {
      type: String,
      unique: true,
    }
  ],
  areaDeUso: [
    {
      type: String,
      unique: true,
    }
  ],
  marca: [
    {
      type: String,
      unique: true,
    }
  ],
  lugarCompra: [
    {
      type: String,
      unique: true,
    }
  ],
  peso: [
    {
      type: Number,
      unique: true,
    }
  ],
  unidadPeso: [
    {
      type: String,
      unique: true,
    }
  ],
})
export default model("ElementosProductoModelo", elementosProductoSchema, "elementosProductoModelo");