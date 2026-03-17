import express from 'express';
import { router as authRouter } from './auth.js';
import { router as userRouter } from "./user.js";
import { router as manufacturerRouter } from "./manufacturer.js";
import { router as productRouter } from "./product.js";
import { router as orderRouter } from "./order.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/manufacturer", manufacturerRouter);
router.use("/product", productRouter);
router.use('/order', orderRouter);

export {
  router
}

