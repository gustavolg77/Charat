import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool, pingDB } from "./db";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

// Health básico
app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "charat-server",
    now: new Date().toISOString(),
  });
});

// Verificación de DB (SELECT 1)
app.get("/api/db", async (_req, res) => {
  try {
    await pingDB();
    res.json({ ok: true, db: "connected" });
  } catch (e: any) {
    res.status(500).json({ ok: false, error: e?.message || "db error" });
  }
});

// Opcional: listar usuarios existentes
// Ajusta columnas según tu tabla real en pgAdmin
app.get("/api/users", async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, create_at
       FROM users
       ORDER BY id ASC`
    );
    res.json({ ok: true, users: result.rows });
  } catch (e: any) {
    res.status(500).json({ ok: false, error: e?.message || "query error" });
  }
});

app.listen(port, () => {
  console.log(`API lista en http://localhost:${port}`);
});
