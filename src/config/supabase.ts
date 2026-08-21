import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { Database } from '../types/database.js';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
// Usamos la publishable/anon key para operaciones normales, o secret key para backend administrativo
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('\x1b[31m%s\x1b[0m', '❌ Error: Variables de entorno no configuradas.');
  console.error('Asegúrate de definir SUPABASE_URL y SUPABASE_PUBLISHABLE_KEY en tu archivo .env');
  process.exit(1);
}

/**
 * Cliente de Supabase fuertemente tipado utilizando el esquema de TypeScript.
 * Al pasar el tipo genérico <Database>, Supabase inferirá automáticamente
 * los tipos de datos al hacer `.from('usuarios').select(...)`
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false, // Recomendado para entornos de backend Node.js
    autoRefreshToken: false,
  },
});

export const config = {
  url: supabaseUrl,
  hasPublishableKey: !!process.env.SUPABASE_PUBLISHABLE_KEY,
  hasSecretKey: !!process.env.SUPABASE_SECRET_KEY && !process.env.SUPABASE_SECRET_KEY.includes('••••'),
  jwksUrl: process.env.SUPABASE_JWKS_URL,
};
