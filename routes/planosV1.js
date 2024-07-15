import { Router } from "express";
import { PlanoController } from "../controllers/planos.js";

export const createPlanoRouterV1 = ({ planoModel }) => {
  const planoRouter = Router();

  const planoController = new PlanoController({
    planoModel,
  });

  // Define your routes here
  planoRouter.get("/", planoController.getAll);
  planoRouter.post("/", planoController.create);

  planoRouter.get("/:id", planoController.getById);
  planoRouter.patch("/:id", planoController.updateSeat);
  planoRouter.put("/:id", planoController.update);
  planoRouter.delete("/:id", planoController.delete);

  return planoRouter;
};
