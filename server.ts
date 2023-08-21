import express from "express";
import bodyParser from "body-parser";
import usersRoutes from "./routes/users";
import cors from "cors";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

const userRouter = usersRoutes;
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`server running on port: http://localhost:${PORT}`);
});