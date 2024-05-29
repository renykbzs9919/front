import axios from './axios';
import Cookies from 'js-cookie';

// Define los tipos para las solicitudes y respuestas de usuario
interface User {
  name?: string;
  email: string;
  password: string;
  password_confirm:string;
  avatar?: string;
  role?: string;
}

interface AuthResponse {
  jwt: string;
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    password_confirm:string;
    role: string;
    avatar?: string;
    date: string;
  };
}

// Función para registrar un usuario
export const registerRequest = async (user: User) => {
  return axios.post<AuthResponse>('/logout', user);
};

// Función para hacer login
export const login = async (user: Pick<User, 'email' | 'password'>) => {
  return axios.post<AuthResponse>('/login', user);
};

// Función para hacer logout
export const logout = () => {

  localStorage.removeItem('token');
  Cookies.remove('token');

};