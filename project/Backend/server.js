import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "../Frontend")));
app.use(express.static(path.resolve(__dirname, "../Frontend/scripts")));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../Frontend/mainPage/index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});