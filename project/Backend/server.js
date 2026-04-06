// Import Section
const cors = require("cors");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// App use section
app.use(cors());
app.use(express.json());


app.use(express.static(path.resolve(__dirname, "../Frontend")));
app.use(express.static(path.resolve(__dirname, "../Frontend/scripts")));

// Главная страница
app.get("/", (req, res) => {
    try {
        res.sendFile(path.resolve(__dirname, "../Frontend/mainPage/index.html"));
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

// Listener
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});