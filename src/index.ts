import { PORT } from "../config";

import app from "../src/servidor/index";
import { conectar } from "../src/conexion_DB/conexion";

app.listen(PORT, () => {
  conectar()
  console.log(`Servidor levantado en el puerto: ${PORT}`); 
})