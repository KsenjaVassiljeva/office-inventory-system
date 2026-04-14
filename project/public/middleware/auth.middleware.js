import { createPB } from "../config/pocketbase.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const pb = createPB();
    pb.authStore.save(token, null);

    await pb.collection("users").authRefresh();

    req.user = pb.authStore.model;
    req.pb = pb;

    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};