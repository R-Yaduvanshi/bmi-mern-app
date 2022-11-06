import React from "react";
import { useState } from "react";

const CalculateBMI = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBMI] = useState("");
  //   console.log(height, weight);
  const handleSubmit = () => {
    const payload = {
      height,
      weight,
    };
    fetch("http://localhost:8000/calculateBMI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => setBMI(res.BMI));
    // console.log(payload);
  };
  return (
    <div>
      {bmi ? <h1> {`Your BMI is: ${bmi}`}</h1> : <h1>BMI</h1>}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "100%",
        }}
      >
        <input
          type="string"
          placeholder="Height"
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          type="string"
          placeholder="weight"
          onChange={(e) => setWeight(e.target.value)}
        />
        <button onClick={handleSubmit}>CalculateBMI</button>
      </div>
    </div>
  );
};

export default CalculateBMI;
