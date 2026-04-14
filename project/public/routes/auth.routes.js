import express from "express";
import { loginUser, registerUser } from "../services/auth.service.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const authData = await loginUser(email, password);

    res.json({
      token: authData.token,
      user: authData.record,
    });
  } catch (error) {
    res.status(401).json({ error: "Login failed" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Registration failed" });
  }
});

export default router;