import React, { useState } from "react";
import { TextField, Button, Typography, Box, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassowrd(e.target.value);

  const login = async (e) => {
    e.preventDefault();

    if (email === "" || password === "")
      return alert("Please enter all fields");
    else if (!email.includes("@")) return alert("Please enter a valid email");

    const url = import.meta.env.VITE_API + "/auth/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("token", data.accessToken);
        return navigate("/dashboard");
      } else if (response.status === 404) {
        alert("User not found");
      } else if (response.status === 400) {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - login form */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <Box
          component="form"
          onSubmit={login}
          className="w-full max-w-md px-10 py-16"
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Ballers Admin Login
          </Typography>

          <div className="mt-6 flex flex-col gap-6">
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#FF6A3C",
                "&:hover": { backgroundColor: "darkorange" },
                fontWeight: "bold",
              }}
              fullWidth
            >
              Login
            </Button>
          </div>
        </Box>
      </div>

      {/* Divider */}
      <div className="w-px bg-gray-300" />

      {/* Right side - background image */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(../images/loginPhoto.png)`,
        }}
      ></div>
    </div>
  );
};

export default LoginPage;
