import cors from "cors";
import express, { json } from "express";
import { GrupoModel } from "./models/grupo.js";
import "./models/mongo.js";
import { ObraModel } from "./models/obra.js";
import { PlanoModel } from "./models/plano.js";
import { RepresentacionModel } from "./models/representacion.js";
import { createGrupoRouterV1 } from "./routes/gruposV1.js";
import { createObraRouterV1 } from "./routes/obrasV1.js";
import { createPlanoRouterV1 } from "./routes/planosV1.js";
import { createRepresentacionRouterV1 } from "./routes/representacionesV1.js";

const app = express();

app.use(json());
app.use(
  cors({
    origin: (origin, callback) => {
      const whitelist = [
        "http://localhost:4200",
        "https://entradasteatromenesiano.onrender.com",
        "https://entradasteatromenesiano-pre.onrender.com",
      ];
      if (whitelist.includes(origin) || !origin) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Servidor despierto!</h1>");
});

app.use((req, res, next) => {
  console.log(req.method, req.url, req.body);
  next();
});

app.use("/api/v1/obras", createObraRouterV1({ obraModel: ObraModel }));

app.use("/api/v1/grupos", createGrupoRouterV1({ grupoModel: GrupoModel }));

app.use(
  "/api/v1/representaciones",
  createRepresentacionRouterV1({
    representacionModel: RepresentacionModel,
    planoModel: PlanoModel,
  })
);

app.use("/api/v1/planos", createPlanoRouterV1({ planoModel: PlanoModel }));

const PORT = process.env.PORT || 1993;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
