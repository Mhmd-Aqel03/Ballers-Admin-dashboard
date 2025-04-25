import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassowrd(e.target.value);
  };

  const login = async (e) => {
    e.preventDefault();

    if (email == "" || password == "") alert("please enter all feilds");
    else if (!email.includes("@")) alert("Please enter a valid email");

    const url = import.meta.env.VITE_API + "/auth/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();

      if (response.status == 200) {
        localStorage.setItem("token", data.accessToken);
        return navigate("/dashboard");
      } else if (response.status == 404) {
        alert("User not found");
      } else if (response.status == 400) {
        alert("huh?");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-6xl">Ballers Admin Dashboard</h1>
      {/* Email Feild */}
      <div>
        <TextField
          label="Email"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
          variant="standard"
        />
      </div>
      {/* Password */}
      <div className="">
        <TextField
          label="Password"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
          variant="standard"
        />
      </div>
      {/* Submit */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#FF6A3C",
          "&:hover": { backgroundColor: "darkorange" },
        }}
        onClick={login}
      >
        Login
      </Button>
    </div>
  );
};

export default LoginPage;
