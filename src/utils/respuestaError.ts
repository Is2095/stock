import { Response } from "express"

const RespuestaError = (res: Response, status: number, messageError: string | Array<string>) => {
  res.status(status).json({
    error: true,
    messageError
  })
}

export default RespuestaError;