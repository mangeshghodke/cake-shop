import { useAuth0 } from '@auth0/auth0-react'

export default function LogoutButton() {
  const { logout } = useAuth0()
  return (
    <button
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin + import.meta.env.BASE_URL } })}
      className="text-sm text-gray-700 hover:text-pink-600 font-medium transition-colors cursor-pointer"
    >
      Sign Out
    </button>
  )
}
