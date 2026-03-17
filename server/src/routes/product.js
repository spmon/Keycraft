import express from "express";
import { jwtGuard } from "../middlewares/guards/jwtGuard.js";
import { ProductController } from "../controllers/product.js";
import { isAdmin } from "../middlewares/guards/isAdmin.js"

const router = express.Router();
const productController = new ProductController();

router.post('/create', jwtGuard, isAdmin, productController.add);
router.put('/update', jwtGuard, isAdmin, productController.update);
router.delete('/delete/:id', jwtGuard, isAdmin, productController.delete);
router.get('/details/:id', productController.detail);
router.get('/index/:category', productController.index);

export {
  router
}
