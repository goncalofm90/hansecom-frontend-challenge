export interface User {
  id: number
  fullName: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
}
export interface Order {
  id: number
  userId: number
  orderDate: string
  product: string
  createdAt: string
  updatedAt: string
}

export interface State {
  users: User[]
  user: User | null
  isLoading: boolean
  error: string | null
}
