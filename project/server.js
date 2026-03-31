import express from "express";
import path from "path";
import PocketBase from "pocketbase";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3000;
const PB_URL =
  process.env.PB_URL ||
  "http://pocketbase-nymicyupwjww3n88j2wrpu9s.176.112.158.15.sslip.io";

const pb = new PocketBase(PB_URL);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const localPb = new PocketBase(PB_URL);

    localPb.authStore.save(token, null);

    // просто проверяем токен без refresh
    if (!localPb.authStore.isValid) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = localPb.authStore.model;
    req.pb = localPb;

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid token" });
  }
};


// INFO
app.get("/api/info", (req, res) => {
  res.json({
    message: "Server working",
    time: new Date().toISOString(),
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const authData = await pb
      .collection("users")
      .authWithPassword(email, password);

    res.json({
      token: authData.token,
      user: authData.record,
    });
  } catch (error) {
    res.status(401).json({ error: "Login failed" });
  }
});


app.post("/register", async (req, res) => {
  const { email, password, passwordConfirm } = req.body;

  try {
    const user = await pb.collection("users").create({
      email,
      password,
      passwordConfirm,
    });

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/users", authMiddleware, async (req, res) => {
  try {
    const users = await req.pb.collection("users").getFullList({
      sort: "-created",
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get("/users/:id", authMiddleware, async (req, res) => {
  try {
    const user = await req.pb.collection("users").getOne(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: "Not found" });
  }
});



app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});