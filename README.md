# 🚀 Proyecto Demostrativo: TypeScript + Supabase API (Bootcamp)

Este proyecto está diseñado para cómo conectar una aplicación en **TypeScript** con una base de datos **PostgreSQL** alojada en **Supabase**, estructurando el código de manera modular y profesional siguiendo buenas prácticas de la industria.

---

## 📁 Estructura del Proyecto

```text
├── .env                  # Variables de entorno con claves de Supabase (Privado)
├── .env.example          # Plantilla para compartir el proyecto
├── .gitignore            # Exclusión de archivos sensibles y node_modules
├── package.json          # Scripts y dependencias
├── tsconfig.json         # Configuración del compilador TypeScript
├── README.md             # Esta guía educativa
└── src/
    ├── config/
    │   └── supabase.ts   # Inicialización y validación del cliente Supabase
    ├── types/
    │   └── database.ts   # Tipos e interfaces de la tabla 'usuarios'
    ├── services/
    │   └── usuarios.service.ts # Lógica de consultas (Service/Repository Layer)
    └── index.ts          # Script principal de demostración
```

---

## 🛠️ Requisitos Previos

- **Node.js**: v18 o superior.
- **npm**: v9 o superior.

---

## ⚡ Instalación y Configuración

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Configurar variables de entorno**:
   Asegúrate de que el archivo `.env` contenga los valores de tu proyecto de Supabase:
   ```env
   SUPABASE_URL=https://ymraquwloarojcvprizp.supabase.co
   SUPABASE_PUBLISHABLE_KEY=sb_publishable_c7QCA0PdcuLgmTUcjnBRLA_q0qfyXqg
   SUPABASE_SECRET_KEY=tu_secret_key_opcional
   SUPABASE_JWKS_URL=https://ymraquwloarojcvprizp.supabase.co/auth/v1/.well-known/jwks.json
   ```

---

## 🎯 Scripts Disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Ejecuta el script en modo desarrollo con recarga en tiempo real (`watch`). |
| `npm start` | Ejecuta la demostración una sola vez con `tsx`. |
| `npm run typecheck` | Valida todos los tipos de TypeScript sin generar archivos. |
| `npm run build` | Compila el código TypeScript a JavaScript en la carpeta `dist/`. |

---

## 💡 Guía

### 1- Script SQL de Demostración (Opcional en Supabase SQL Editor)
Si la tabla `usuarios` aún no está creada o no tiene datos de prueba, puedes ejecutar esto en el **SQL Editor** de Supabase:

```sql
-- 1. Crear tabla usuarios si no existe
CREATE TABLE IF NOT EXISTS public.usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    rol TEXT DEFAULT 'estudiante',
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Habilitar lectura pública (o configurar Row Level Security según tu caso)
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir lectura publica de usuarios" 
ON public.usuarios 
FOR SELECT 
USING (true);

-- 3. Insertar datos de prueba
INSERT INTO public.usuarios (nombre, email, rol) 
VALUES 
    ('Ana García', 'ana.garcia@example.com', 'estudiante'),
    ('Carlos Pérez', 'carlos.perez@example.com', 'instructor'),
    ('Lucía Torres', 'lucia.torres@example.com', 'estudiante')
ON CONFLICT (email) DO NOTHING;
```
