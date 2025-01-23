import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { MongooseError } from "mongoose";
import { MongoError } from 'mongodb';
import morgan from "morgan";
import { ManejadorErroresMongoose } from "../manejadorDeErrores";
import routerProductosStock from "../logica_producto/routers.productoStock";
import RespuestaAlFrontend from "../utils/respuestaAlFrontend";
import routerPedidos from "../logica_pedidos/router.pedidos/router.pedidos";

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.disable("x-powered-by");
app.use(rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 50
}))
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, DELETE, PATCH'
  );
  res.header("X-Total-Count", "1000");

  next();
})
app.use('/api', routerProductosStock);
app.use('/pedidos', routerPedidos)
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const errors = err.errors
  if (err instanceof MongooseError || err instanceof MongoError) {
      ManejadorErroresMongoose(err, errors, res);
  } else {  
    const statusCode = err.statusCode != null ? err.statusCode : 500;  
    RespuestaAlFrontend(res, statusCode, err.message, null, true)
  };

})

export default app;
