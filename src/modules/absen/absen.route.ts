import { Router } from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import { adminMiddleware } from "../../common/middlewares/admin.middleware";
import { absenController } from "./absen.controller";
import { absenService } from "./absen.service";
import { userRepository } from "../user/user.repository";
import { absenRepository } from "./absen.repository";

const absenRoute = Router();

const userRepo = new userRepository();
const absenRepo = new absenRepository();
const service = new absenService(absenRepo, userRepo);
const controller = new absenController(service);

absenRoute.get("/", authMiddleware, adminMiddleware, controller.getAllAbsen.bind(controller));
absenRoute.post("/" , authMiddleware , adminMiddleware , controller.createAbsen.bind(controller));

// 
absenRoute.get("/today" , authMiddleware , controller.getAbsenToday.bind(controller));
absenRoute.post("/today" , authMiddleware , controller.absenUserToday.bind(controller));
absenRoute.delete("/today/:absenId" , authMiddleware, adminMiddleware , controller.deleteAbsenToday.bind(controller));

// Absen user
absenRoute.get("/user" , authMiddleware, controller.getAbsenUser.bind(controller));

export default absenRoute;