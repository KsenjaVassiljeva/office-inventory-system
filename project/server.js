const express = require('express');
const path = require('path');
const PocketBase = require('pocketbase');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const NIMI = process.env.MY_NAME || "Tundmatu nimi (Viga!)";

const pb = new PocketBase('http://pocketbase-nymicyupwjww3n88j2wrpu9s.176.112.158.15.sslip.io');

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Пример эндпоинта с PocketBase
app.get('/users', async (req, res) => {
    try {
        const records = await pb.collection('users').getFullList({ sort: '-created' });
        res.json(records);
    } catch (err) {
        console.error('PocketBase viga:', err);
        res.status(500).json({ error: 'Andmebaasi viga' });
    }
});

// Страница успешной оплаты
app.get('/success', (req, res) => {
    const sessionId = req.query.session_id;

    if (!sessionId) {
        return res.status(400).send(`
            <h1>Error</h1>
            <p>Session ID puudub!</p>
            <a href="/">Tagasi</a>
        `);
    }

    res.send(`
        <h1>Payment Successful!</h1>
        <p>Aitäh ostu eest.</p>
        <p><strong>Session ID:</strong> ${sessionId}</p>
        <a href="/">Back to Home</a>
    `);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`API Server töötab pordil: ${PORT}`);
    console.log(`Kasutaja nimi: ${NIMI}`);
});