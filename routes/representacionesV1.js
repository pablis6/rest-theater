import { Router } from "express";
import { RepresentacionController } from "../controllers/representacion.js";

export const createRepresentacionRouterV1 = ({ representacionModel }) => {
  const representacionesRouter = Router();

  const representacionController = new RepresentacionController({
    representacionModel,
  });

  // Define your routes here
  representacionesRouter.get("/", representacionController.getAll);
  representacionesRouter.post("/", representacionController.create);

  representacionesRouter.get("/:id", representacionController.getById);
  representacionesRouter.patch("/:id", representacionController.update);
  representacionesRouter.delete("/:id", representacionController.delete);

  return representacionesRouter;
};
