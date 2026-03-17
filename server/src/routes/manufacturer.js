import express from "express";
import { jwtGuard } from "../middlewares/guards/jwtGuard.js";
import { ManufacturerController } from "../controllers/manufacturer.js";
import { isAdmin } from "../middlewares/guards/isAdmin.js";

const router = express.Router();
const manufacturerController = new ManufacturerController();

router.post('/create', jwtGuard, isAdmin, manufacturerController.add);
router.put('/update', jwtGuard, isAdmin, manufacturerController.update);
router.delete('/delete/:id', jwtGuard, isAdmin, manufacturerController.delete);
router.get('/index/:category', manufacturerController.index);

export {
  router
}
