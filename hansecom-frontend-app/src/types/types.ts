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
  orderId: number
  orderDate: string
  product: string
  createdAt: string
  updatedAt: string
}

export interface State {
  users: User[]
  user: User | null
  orders: Order[]
  isLoading: boolean
  error: string | null
}
