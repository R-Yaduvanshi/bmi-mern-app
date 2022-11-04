const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome its working");
});

app.listen(8000, () => {
  console.log("Port No 8000");
});
