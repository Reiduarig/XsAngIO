export interface Componente {
    icon: string;
    name: string;
    redirectTo: string;
}

export interface Recetas {
    user_id: number;
    nombre: string;
    fecha: Date;
    frecuencia: string;
    cantidad: string;
    duración: string;
}

export interface Citas {
    user_id: number;
    fecha: Date;
    descripcion: string;
    estado: string;
}

export interface User{
    id: number;
    name: string;
    surname: string;
    password: string;
    email: string;
    role: string;
    image: string;
}