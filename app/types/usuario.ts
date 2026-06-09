export type UserRole = 'ROLE_STUDENT' | 'ROLE_PROFESSOR' | 'ROLE_ADMIN'

export interface Usuario {
  id: string
  nome: string
  email: string
  avatar?: string
  role: UserRole
  departamento?: string
}

export interface LoginResponse {
  token: string
  user: Usuario
}