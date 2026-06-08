export interface AuthUser {
  email: string;
  id: number;
  name: string;
  role: 'admin' | 'student';
}

export interface LoginCredentials {
  email: string;
  password: string;
}
