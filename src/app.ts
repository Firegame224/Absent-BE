import express from "express";
import cors from "cors"
import cookieparser from "cookie-parser";
import { errorMiddleware } from "./common/middlewares/error.middleware";
import { userRoute } from "./modules/user/user.route";
import { absenRoute } from "./modules/absen/absen.route";

const app = express();
const port = 5000;

app.use(cors({ credentials: true , origin : "http://localhost:5173" }))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser());

app.get("/api/v3", (_req, res) => {
  res.send("Hellor world");
});

app.use("/api/v3/user", userRoute)
app.use("/api/v3/absen", absenRoute)

app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});