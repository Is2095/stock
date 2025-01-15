
import { Response } from "express"

const RespuestaAlFrontend = (res: Response, statusCode: number, message: string | Array<string>, data: any, error: boolean) => {
  res.status(statusCode).json({
    error,
    message,
    data 
  })
}
export default RespuestaAlFrontend;