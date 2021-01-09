import { Router } from "express";
import * as currencyController from "../../controllers/currencyController";

// Create router
const router = Router();

// Routes path
router.get("/reloadCurrencyList", currencyController.reload);

export default router;
