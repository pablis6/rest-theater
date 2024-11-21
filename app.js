import axios from "axios";
import cors from "cors";
import "dotenv/config";
import express, { json } from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { GrupoModel } from "./models/grupo.js";
import "./models/mongo.js";
import { ObraModel } from "./models/obra.js";
import { PlanoModel } from "./models/plano.js";
import { RepresentacionModel } from "./models/representacion.js";
import { createGrupoRouterV1 } from "./routes/gruposV1.js";
import { createObraRouterV1 } from "./routes/obrasV1.js";
import { createPlanoRouterV1 } from "./routes/planosV1.js";
import { createRepresentacionRouterV1 } from "./routes/representacionesV1.js";

// Configura la instancia de axios con la base URL desde las variables de entorno
const api = axios.create({
  baseURL: process.env.API_BASE_URL,
});

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:4200",
      "https://entradasteatromenesiano.onrender.com",
      "https://entradasteatromenesiano-pre.onrender.com",
    ],
  },
});

app.use(json({ limit: "50mb" }));
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

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
  socket.on("join", (representacionId) => {
    console.log("Unido al plano " + representacionId);
    socket.join(representacionId);
  });
  socket.on("butacas", async (plano) => {
    try {
      // Hacer la solicitud HTTP a la API REST para actualizar el plano
      const response = await api.patch(
        `/api/v1/planos/${plano.representacion}`,
        plano.butacas
      );

      // Emitir el evento al resto de los clientes
      io.to(plano.representacion).emit("butacas", response.data);
    } catch (error) {
      console.error("Error al actualizar el plano:", error);
    }
  });
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
server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
