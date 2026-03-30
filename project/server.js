// server.js
import express from "express";
import path from "path";
import PocketBase from "pocketbase";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const pb = new PocketBase('http://pocketbase-nymicyupwjww3n88j2wrpu9s.176.112.158.15.sslip.io');

const PORT = process.env.PORT || 3000;
const NIMI = process.env.MY_NAME || "Tundmatu nimi (Viga!)";

app.use(express.json());

/* API INFO */
app.get('/api/info', (req, res) => {
    res.status(200).json({
        misioon: "Iseseisev deplomine edukas",
        meeskond: NIMI,
        aeg: new Date().toISOString()
    });
});

/* GET USERS */
app.get('/api/users', async (req, res) => {
    try {
        const users = await pb.collection('users').getFullList({
            sort: '-created'
        });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

/* GET ONE USER */
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await pb.collection('users').getOne(req.params.id);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: "User not found" });
    }
});

/* SERVE HTML */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/* START SERVER */
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server töötab pordil: ${PORT}`);
});