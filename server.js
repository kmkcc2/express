const express = require("express");
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/users.js");
// const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
// app.use(cors());

const userRouter = usersRoutes;
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`server running on port: http://localhost:${PORT}`);
});
