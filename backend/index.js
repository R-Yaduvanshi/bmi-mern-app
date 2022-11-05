const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
app.use(express.json());
const bcrypt = require("bcrypt");
const { connection } = require("./config/db");
const { UserModel } = require("./models/UserModel.model");
const { authentication } = require("./middlewares/authentication");
const { BmiModel } = require("./models/BMIModel");
app.get("/", (req, res) => {
  res.send("Welcome its working");
});

//Signup

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserModel.findOne({ email });
  console.log(user);
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

//Login

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    const hash_password = user.password;
    const user_id = user._id;
    bcrypt.compare(password, hash_password, (err, result) => {
      if (result == true) {
        const generated_token = jwt.sign(
          { userID: user_id },
          process.env.SECRET_KEY
        );
        res.send({
          Message: "Login Success",
          token: generated_token,
        });
      }
      if (result == false) {
        res.send("Wrong password");
      }
      if (err) {
        res.send("Something Went wrong");
      }
    });
  } else {
    res.send("Signup First");
  }
});

//GetProgfile

app.get("/getProfile", authentication, async (req, res) => {
  const { userID } = req.body;
  const user = await UserModel.findOne({ _id: userID });
  const { name, email } = user;
  // console.log(user);
  res.send({
    name,
    email,
  });
});

//BMI Check

app.post("/calculateBMI", authentication, async (req, res) => {
  const { height, weight, userID } = req.body;
  const user = await UserModel.findOne({ _id: userID });
  const name = user.name;
  const height_in_meter = Number(height) * 0.304;
  const BMI = Number(weight) / height_in_meter ** 2;
  const new_bmi = new BmiModel({
    name,
    user_id: userID,
    height: height_in_meter,
    weight,
  });

  await new_bmi.save();
  res.send({ BMI });
});

//BMI History

app.get("/getBMIrecords", authentication, async (req, res) => {
  const { userID } = req.body;
  const bmi_history = await BmiModel.find({ user_id: userID });
  res.send({
    your_BMI_Data: bmi_history,
  });
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
