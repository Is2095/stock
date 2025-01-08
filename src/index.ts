import { PORT } from "./config";

import { conectar } from "../src/conexion_DB/conexion";
import app from "../src/servidor/index";

app.listen(PORT, () => {
  conectar()
  console.log(`Servidor levantado en el puerto: ${PORT}`); 
})