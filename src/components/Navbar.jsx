import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useCart } from '../context/CartContext'
import LoginButton from './LoginButton'
import UserMenu from './UserMenu'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const linkClass = ({ isActive }) =>
  `font-medium transition-colors ${
    isActive ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-700 hover:text-pink-600'
  }`

const mobileLinkClass = ({ isActive }) =>
  `block px-6 py-2 font-medium ${
    isActive ? 'text-pink-600 bg-pink-50' : 'text-gray-700 hover:bg-pink-50'
  }`

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { isLoading, isAuthenticated } = useAuth0()
  const cart = useCart()
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🎂</span>
            <span className="text-xl font-bold text-pink-700">Sweet Delights</span>
          </Link>

          <div className="hidden md:flex gap-8 ml-auto">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={linkClass}
                end={to === '/'}
              >
                {label}
              </NavLink>
            ))}
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative font-medium transition-colors ${
                  isActive
                    ? 'text-pink-600 border-b-2 border-pink-600'
                    : 'text-gray-700 hover:text-pink-600'
                }`
              }
            >
              <svg className="w-6 h-6 inline-block align-middle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </NavLink>
            {!isLoading && (
              <div className="border-l border-gray-200 pl-6">
                {isAuthenticated ? <UserMenu /> : <LoginButton />}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto md:ml-0">
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `md:hidden relative p-2 rounded-md ${
                  isActive ? 'text-pink-600' : 'text-gray-700'
                }`
              }
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </NavLink>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-pink-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t pb-4">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={mobileLinkClass}
            >
              {label}
            </NavLink>
          ))}
          <div className="border-t border-gray-100 mt-2 pt-2 px-6">
            {isAuthenticated ? <UserMenu /> : <LoginButton />}
          </div>
        </div>
      )}
    </nav>
  )
}
