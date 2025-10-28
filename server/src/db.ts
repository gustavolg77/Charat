import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const connectionString = process.env.DATABASE_URL as string;
if (!connectionString) {
  throw new Error("DATABASE_URL no está definida en server/.env");
}

// Un pool reutilizable de conexiones
export const pool = new Pool({
  connectionString,
  // Si tu Postgres requiere SSL (cloud), agrega:
  // ssl: { rejectUnauthorized: false }
});

// Helper para verificar la conexión
export async function pingDB() {
  // SELECT 1 es el “hola” universal de las bases
  await pool.query("SELECT 1");
}
