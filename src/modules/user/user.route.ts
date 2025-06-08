import { Router } from "express";
import { userController } from "./user.controller";
import { userService } from "./user.service";
import { userRepository } from "./user.repository";
import { validateMiddleware } from "../../common/middlewares/validate.middleware";
import { userSChema, userUpdateSchema } from "./user.schema";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import { adminMiddleware } from "../../common/middlewares/admin.middleware";

export const userRoute = Router();

const repository = new userRepository();
const service = new userService(repository);
const controller = new userController(service);

// Admin route
userRoute.get("/", authMiddleware, adminMiddleware, controller.getAllUsers.bind(controller));
userRoute.patch("/", authMiddleware, adminMiddleware, validateMiddleware(userUpdateSchema), controller.updateUser.bind(controller));
userRoute.delete("/", authMiddleware, adminMiddleware, controller.deleteUser.bind(controller));

// User route
userRoute.get("/me", authMiddleware, controller.getuserById.bind(controller));
userRoute.post("/signUp", validateMiddleware(userSChema), controller.signUp.bind(controller));
userRoute.post("/signIn", validateMiddleware(userSChema), controller.signIn.bind(controller));