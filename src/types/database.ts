/**
 * Definiciones de Tipos de Datos (TypeScript)
 * 
 * En proyectos profesionales y para fines pedagógicos en el bootcamp,
 * definir los tipos de nuestras entidades nos permite:
 * 1. Autocompletado inteligente en el IDE (IntelliSense).
 * 2. Detección de errores en tiempo de compilación.
 * 3. Documentación viva del esquema de la base de datos.
 */

export interface Usuario {
  id: string | number;
  nombre?: string;
  email?: string;
  rol?: string;
  activo?: boolean;
  creado_en?: string;
  created_at?: string;
  [key: string]: any;
}

/**
 * Tipo para la creación de un nuevo usuario
 */
export type NuevoUsuario = Partial<Usuario>;

/**
 * Esquema completo de la base de datos para tipar el cliente de Supabase
 */
export interface Database {
  public: {
    Tables: {
      usuarios: {
        Row: Usuario;
        Insert: NuevoUsuario;
        Update: Partial<Usuario>;
        Relationships: [];
      };
    };
  };
}
