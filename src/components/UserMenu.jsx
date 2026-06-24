import { useAuth0 } from '@auth0/auth0-react'
import LogoutButton from './LogoutButton'

export default function UserMenu() {
  const { user } = useAuth0()

  return (
    <div className="flex items-center gap-3">
      <img
        src={user?.picture}
        alt={user?.name}
        className="w-8 h-8 rounded-full"
      />
      <span className="text-sm font-medium text-gray-700 hidden sm:inline">{user?.name}</span>
      <LogoutButton />
    </div>
  )
}
