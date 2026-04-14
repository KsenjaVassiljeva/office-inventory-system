import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const users = await req.pb.collection("users").getFullList({
    sort: "-created",
  });

  res.json(users);
});

router.get("/:id", authMiddleware, async (req, res) => {
  const user = await req.pb.collection("users").getOne(req.params.id);
  res.json(user);
});

export default router;