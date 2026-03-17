import express from "express";
import { UserController } from "../controllers/user.js";
import { jwtGuard } from "../middlewares/guards/jwtGuard.js";

const router = express.Router();
const userController = new UserController();

router.get("/retrieve", jwtGuard, userController.retrieve);
router.put("/update", jwtGuard, userController.update);
router.put("/updatePassword", jwtGuard, userController.updatePassword);

export {
  router
}
