import { Router } from "express";
import * as itemController from "../../controllers/itemController";

// Create router
const router = Router();

// Routes path
router.get("/", itemController.getItem);
router.get("/:id", itemController.getItemById);

export default router;
