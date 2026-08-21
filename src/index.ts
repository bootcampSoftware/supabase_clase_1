import { config } from './config/supabase.js';
import { UsuariosService } from './services/usuarios.service.js';

// Colores ANSI para formatear la salida en terminal durante la demostración
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  dim: '\x1b[2m',
};

async function main() {
  console.log('\n' + colors.cyan + colors.bright + '===================================================' + colors.reset);
  console.log(colors.cyan + colors.bright + ' 🚀 BOOTCAMP: DEMO TYPESCRIPT + SUPABASE API' + colors.reset);
  console.log(colors.cyan + colors.bright + '===================================================' + colors.reset + '\n');

  console.log(`${colors.bright}📌 Parámetros de Conexión:${colors.reset}`);
  console.log(`   ${colors.dim}• URL Proyecto:${colors.reset}       ${config.url}`);
  console.log(`   ${colors.dim}• Publishable Key:${colors.reset}    ${config.hasPublishableKey ? colors.green + 'Configurada ✅' : colors.yellow + 'No configurada'}${colors.reset}`);
  console.log(`   ${colors.dim}• JWKS Endpoint:${colors.reset}      ${config.jwksUrl ?? 'N/A'}\n`);

  try {
    console.log(`${colors.yellow}⏳ Paso 1: Consultando registros de la tabla "usuarios"...${colors.reset}`);
    const inicio = performance.now();

    const usuarios = await UsuariosService.obtenerTodos();
    const tiempoMs = (performance.now() - inicio).toFixed(2);

    console.log(`${colors.green}✅ Consulta ejecutada exitosamente en ${tiempoMs} ms.${colors.reset}\n`);

    if (usuarios.length === 0) {
      console.log(`${colors.yellow}ℹ️  La tabla "usuarios" no contiene registros actualmente o las políticas de RLS (Row Level Security) restringen la lectura.${colors.reset}`);
      console.log(`${colors.dim}   Consejo para el bootcamp: Si creaste la tabla en Supabase, asegúrate de tener una política SELECT habilitada (RLS) o deshabilitar RLS temporalmente para pruebas.${colors.reset}\n`);
    } else {
      console.log(`${colors.bright}👥 Total de usuarios encontrados: ${colors.green}${usuarios.length}${colors.reset}\n`);
      console.log(`${colors.bright}📊 Detalle de los datos obtenidos:${colors.reset}`);
      console.table(usuarios);
    }

    // Demostración de consulta específica si hay datos
    if (usuarios.length > 0 && usuarios[0].id !== undefined) {
      const primerUsuarioId = usuarios[0].id;
      console.log(`\n${colors.yellow}⏳ Paso 2: Demostración de búsqueda por ID (${primerUsuarioId})...${colors.reset}`);
      const usuarioEspecifico = await UsuariosService.obtenerPorId(primerUsuarioId);
      console.log(`${colors.green}✅ Usuario encontrado:${colors.reset}`, usuarioEspecifico);
    }

  } catch (error: unknown) {
    console.error(`\n${colors.red}${colors.bright}❌ Error durante la ejecución de la consulta:${colors.reset}`);
    if (error instanceof Error) {
      console.error(`${colors.red}${error.message}${colors.reset}`);
    } else {
      console.error(error);
    }
    
    console.log(`\n${colors.yellow}💡 Puntos clave a revisar con los estudiantes:${colors.reset}`);
    console.log(` 1. ¿La tabla 'usuarios' existe en la base de datos de Supabase?`);
    console.log(` 2. ¿Tiene activado RLS (Row Level Security) sin una política que permita el acceso SELECT?`);
    console.log(` 3. ¿Las credenciales del archivo .env son correctas?`);
  }

  console.log('\n' + colors.cyan + '===================================================' + colors.reset + '\n');
}

// Ejecutar la demostración
main();
