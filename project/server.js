import express from "express";
import path from "path";
import PocketBase from "pocketbase";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3000;
const NIMI = process.env.MY_NAME || "Tundmatu nimi (Viga!)";

const PB_URL = "http://pocketbase-nymicyupwjww3n88j2wrpu9s.176.112.158.15.sslip.io";

const pb = new PocketBase(PB_URL);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token puudub või vale formaat" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const localPb = new PocketBase(PB_URL);

    localPb.authStore.save(token, null);
    await localPb.collection("users").authRefresh();

    req.user = localPb.authStore.model;
    req.pb = localPb;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Vale või aegunud token" });
  }
};


app.get("/api/info", (req, res) => {
  res.json({
    misioon: "Iseseisev deplomine edukas",
    meeskond: NIMI,
    aeg: new Date().toISOString(),
  });
});


app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email ja parool on kohustuslikud" });
  }

  try {
    const authData = await pb
      .collection("users")
      .authWithPassword(email, password);

    res.json({
      token: authData.token,
      user: authData.record,
    });

  } catch (error) {
    res.status(401).json({ error: "Vale email või parool" });
  }
});


app.post("/api/register", async (req, res) => {
  const { email, password, passwordConfirm } = req.body;

  if (!email || !password || !passwordConfirm) {
    return res.status(400).json({ error: "Puuduvad väljad" });
  }

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



app.post("/api/logout", (req, res) => {
  res.json({ message: "Välja logitud" });
});


app.get("/api/users", authMiddleware, async (req, res) => {
  try {
    const users = await req.pb.collection("users").getFullList({
      sort: "-created",
    });

    res.json(users);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get("/api/users/:id", authMiddleware, async (req, res) => {
  try {
    const user = await req.pb
      .collection("users")
      .getOne(req.params.id);

    res.json(user);

  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
});


app.get("/api/me", authMiddleware, (req, res) => {
  res.json(req.user);
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server töötab pordil: ${PORT}`);
});