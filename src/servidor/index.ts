import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { MongooseError } from "mongoose";
import { ManejadorErroresMongoose } from "../manejadorDeErrores";
import router from "../routers/index";
import RespuestaAlFrontend from "../utils/respuestaAlFrontend";

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
app.use('/api', router);
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err.message, "*******************");
  const errors = err.errors
  if (err instanceof MongooseError) {
      ManejadorErroresMongoose(err, errors, res);
  } else {
    
    RespuestaAlFrontend(res, err.statusCode, err.message, null, true)

  };

})

export default app;
