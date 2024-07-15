import { Router } from "express";
import { ObraController } from "../controllers/obras.js";

export const createObraRouterV1 = ({ obraModel }) => {
  const obrasRouter = Router();

  const obraController = new ObraController({ obraModel });

  // Define your routes here
  obrasRouter.get("/", obraController.getAll);
  obrasRouter.post("/", obraController.create);

  obrasRouter.get("/:id", obraController.getById);
  obrasRouter.patch("/:id", obraController.update);
  obrasRouter.delete("/:id", obraController.delete);

  return obrasRouter;
};
