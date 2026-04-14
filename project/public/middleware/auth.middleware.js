import { createPB } from "../config/pocketbase.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token" });
  }

  const token = authHeader.split(" ")[1];

  const pb = createPB();

  // ВАЖНО: подставляем токен
  pb.authStore.save(token, null);

  try {
    // Проверяем токен
    await pb.collection("users").authRefresh();

    req.pb = pb;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};