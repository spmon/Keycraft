import express from 'express';
import { OrderController } from '../controllers/order.js';
import { jwtGuard } from '../middlewares/guards/jwtGuard.js';
import { isAdmin } from "../middlewares/guards/isAdmin.js";

let router = express.Router();
let orderController = new OrderController();

router.post('/create', jwtGuard, orderController.add);
router.get('/index', jwtGuard, orderController.index);
router.delete('/delete/:id', jwtGuard, orderController.delete);
router.put('/update', jwtGuard, isAdmin, orderController.update);

export {
  router
}
