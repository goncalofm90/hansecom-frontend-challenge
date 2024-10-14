export interface User {
  id: number
  fullName: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface State {
  users: User[]
  isLoading: boolean
  error: string | null
}
