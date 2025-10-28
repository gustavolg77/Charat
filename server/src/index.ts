import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port= Number (process.env.PORT||4000);

app.use(cors());            // Permite peticiones desde el front (otro puerto)
app.use(express.json());    // Parsear JSON en req.body

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "charat-server",
    now: new Date().toISOString(),
  });
});

// Arranque
app.listen(port, () => {
  console.log(`API lista en http://localhost:${port}`);
});