import { supabase } from '../config/supabase.js';
import { Usuario, NuevoUsuario } from '../types/database.js';

/**
 * Servicio para encapsular la lógica de acceso a datos de la tabla 'usuarios'.
 * Enseña a los alumnos el patrón 'Service / Repository Layer' para separar
 * responsabilidades y mantener el código modular, testeable y mantenible.
 */
export class UsuariosService {
  /**
   * Obtiene todos los registros de la tabla 'usuarios'.
   * Equivale a: SELECT * FROM usuarios;
   */
  static async obtenerTodos(): Promise<Usuario[]> {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*');

    if (error) {
      throw new Error(`Error al consultar usuarios: ${error.message} (Código: ${error.code})`);
    }

    return data ?? [];
  }

  /**
   * Obtiene un usuario específico por su ID.
   * Equivale a: SELECT * FROM usuarios WHERE id = :id LIMIT 1;
   */
  static async obtenerPorId(id: string | number): Promise<Usuario | null> {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(`Error al buscar usuario con ID ${id}: ${error.message}`);
    }

    return data;
  }

  /**
   * Obtiene el conteo total de registros en la tabla.
   * Equivale a: SELECT COUNT(*) FROM usuarios;
   */
  static async contar(): Promise<number> {
    const { count, error } = await supabase
      .from('usuarios')
      .select('*', { count: 'exact', head: true });

    if (error) {
      throw new Error(`Error al contar usuarios: ${error.message}`);
    }

    return count ?? 0;
  }

  /**
   * Inserta un nuevo usuario en la tabla.
   * Equivale a: INSERT INTO usuarios (nombre, email, ...) VALUES (...) RETURNING *;
   */
  static async crear(nuevoUsuario: NuevoUsuario): Promise<Usuario> {
    const { data, error } = await supabase
      .from('usuarios')
      .insert(nuevoUsuario)
      .select()
      .single();

    if (error) {
      throw new Error(`Error al crear usuario: ${error.message}`);
    }

    return data;
  }
}
