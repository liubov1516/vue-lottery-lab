import { AuthService } from '@/entities/session'
import { UserService } from '@/entities/user'
import { ServiceProvider } from '@/shared/api'

// Єдине місце, яке знає про конкретні сервіси (шар app може імпортувати все)
export function registerServices(): void {
  ServiceProvider.register('users', () => new UserService())
  ServiceProvider.register('auth', () => new AuthService())
}
