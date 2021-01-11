import { Router } from 'express';
import items from './items';
import currency from './currency';

// Create router
const routes = Router();

// Routes path
routes.use('/items', items);
routes.use('/currency', currency);

export default routes;
