import { Response } from "express";
import { MongooseError } from "mongoose";

interface mon {
  [fieldName: string]: MongooseError
}

const ManejadorErroresMongoose = (err: MongooseError, errors: mon, res: Response) => {
  console.log(err, " dentro del controlador de mongoose");
  
  switch (err.name) {
    case 'ValidationError':
      const mensajes: { [key: string]: string } = {}
      Object.keys(errors).forEach((val: string, indice: number) => {
        if (typeof val === 'string') {
          mensajes[`error${indice + 1}`] = errors[val].message
        }
      })
      return res.status(404).json({ message: mensajes })
    case 'MongooseError':
      return res.status(500).json({ error: true, message: 'Error en el servidor' })
    case 'MongooseServerSelectionError':
      return res.status(500).json({ error: true, message: 'Error en la conexión al servidor' })
    case 'DisconnectedError':
      return res.status(500).json({ error: true, message: 'Perdida de conexión con el servidor' })
    case 'TimeoutError':
      return res.status(500).json({ error: true, message: 'Tiempo execibo en la petición al servidor' })
    case 'CastError':
      return res.status(400).json({ error: true, message: 'Error de tipo', e: err.message})
    case 'MongoServerError':
      return res.status(500).json({ error: true, message: `Error en el Servidor: ${err.message}`})
    default:
      return res.status(500).json({ error: true, message: 'Error general en servidor' })
  }
}
export default ManejadorErroresMongoose;