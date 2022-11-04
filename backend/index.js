const express = require("express");
const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
const { connection } = require("./config/db");
const { UserModel } = require("./models/UserModel.model");
app.get("/", (req, res) => {
  res.send("Welcome its working");
});

//Signup

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    res.send("User already exist");
  } else {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.send("Something went wrong");
      }
      const new_user = new UserModel({
        name,
        email,
        password: hash,
      });

      try {
        await new_user.save();
        res.send("Signup Success");
      } catch (err) {
        res.send("Something went wrong, please try again");
      }
    });
  }
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
