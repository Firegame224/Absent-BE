import express from "express";
import cookieparser from "cookie-parser";

const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser());

app.get("/api/v3", (req, res) => {
  res.send("Hellor world");
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
