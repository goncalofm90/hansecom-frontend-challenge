export interface User {
  id: number
  fullName: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
}

export interface State {
  users: User[]
  isLoading: boolean
  error: string | null
}
