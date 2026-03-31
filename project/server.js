import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import PocketBase from 'pocketbase';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const NIMI = process.env.MY_NAME || "Tundmatu nimi (Viga!)";

const pb = new PocketBase('http://pocketbase-nymicyupwjww3n88j2wrpu9s.176.112.158.15.sslip.io');

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`API Server töötab pordil: ${PORT}`);
    console.log(`Kasutaja nimi: ${NIMI}`);
});