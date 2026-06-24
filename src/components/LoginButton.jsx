import { useAuth0 } from '@auth0/auth0-react'

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0()
  return (
    <button
      onClick={() => loginWithRedirect()}
      className="bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors cursor-pointer"
    >
      Sign In
    </button>
  )
}
