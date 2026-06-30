export type UserRole = 'ROLE_STUDENT' | 'ROLE_PROFESSOR' | 'ROLE_ADMIN'

export interface Usuario {
  id: string
  nome: string
  email: string
  avatar?: string
  role: UserRole
  papeis?: string[]
  departamento?: string
  unidade?: string
  semestre?: string
  interesses?: string[]
  bio?: string
}

export interface LoginResponse {
  token: string
  id: string
  nome: string
  email: string
  papeis: string[]
}