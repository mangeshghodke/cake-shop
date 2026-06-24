/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from 'react'

const STORAGE_KEY = 'sweet-delights-cart'

const CartContext = createContext(null)
const DispatchContext = createContext(null)

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
}

function cartReducer(state, action) {
  let next
  switch (action.type) {
    case 'ADD': {
      const existing = state.find((item) => item.name === action.item.name)
      if (existing) {
        next = state.map((item) =>
          item.name === action.item.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        next = [...state, { ...action.item, quantity: 1 }]
      }
      break
    }
    case 'REMOVE':
      next = state.filter((item) => item.name !== action.name)
      break
    case 'UPDATE_QTY': {
      if (action.quantity <= 0) {
        next = state.filter((item) => item.name !== action.name)
      } else {
        next = state.map((item) =>
          item.name === action.item.name ? { ...item, quantity: action.quantity } : item
        )
      }
      break
    }
    case 'CLEAR':
      next = []
      break
    default:
      return state
  }
  saveCart(next)
  return next
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, null, loadCart)

  return (
    <CartContext.Provider value={cart}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}

export function useCartDispatch() {
  return useContext(DispatchContext)
}
