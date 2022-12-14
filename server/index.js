require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const userRoute = require("./Routes/user");
const authRoute = require("./Routes/auth");

app.use(
  cors({
    exposedHeaders: "x-auth-token",
    methods: "GET,PUT,POST,DELETE",
  })
);
app.use(express.json());
app.use("", userRoute);
app.use("", authRoute);

app.listen(port, () => {
  console.log("Server Start " + port);
});
