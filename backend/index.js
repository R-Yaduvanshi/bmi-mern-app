const express = require("express");
const app = express();
app.use(express.json());
const { connection } = require("./config/db");
app.get("/", (req, res) => {
  res.send("Welcome its working");
});

//Signup

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  console.log({ name, email, password });
});

app.listen(8000, async () => {
  try {
    await connection;
    console.log("Connecting to to db successfull");
  } catch (err) {
    console.log("Connecting to db failed");
    console.log(err);
  }
  console.log("Listen on port no 8000");
});
