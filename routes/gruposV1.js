import { Router } from "express";
import { GrupoController } from "../controllers/grupos.js";

export const createGrupoRouterV1 = ({ grupoModel }) => {
  const gruposRouter = Router();

  const grupoController = new GrupoController({ grupoModel });

  // Define your routes here
  gruposRouter.get("/", grupoController.getAll);
  gruposRouter.post("/", grupoController.create);

  gruposRouter.get("/:id", grupoController.getById);
  gruposRouter.patch("/:id", grupoController.update);
  gruposRouter.delete("/:id", grupoController.delete);

  return gruposRouter;
};
