export interface Usuario {
  id: string
  nome: string
  email: string
  avatar?: string
  role: 'aluno' | 'professor' | 'admin'
  departamento?: string
}