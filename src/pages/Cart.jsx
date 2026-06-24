import { Link } from 'react-router-dom'
import { useCart, useCartDispatch } from '../context/CartContext'

export default function Cart() {
  const cart = useCart()
  const dispatch = useCartDispatch()

  const total = cart.reduce((sum, item) => {
    const price = Number(item.price.replace('₹', ''))
    return sum + price * item.quantity
  }, 0)

  if (cart.length === 0) {
    return (
      <div className="py-24 px-4 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven&apos;t added any cakes yet.</p>
        <Link
          to="/menu"
          className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-full transition-colors"
        >
          Browse Menu
        </Link>
      </div>
    )
  }

  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
        <button
          onClick={() => dispatch({ type: 'CLEAR' })}
          className="text-sm text-red-500 hover:text-red-700 cursor-pointer"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-4 mb-8">
        {cart.map((item) => {
          const price = Number(item.price.replace('₹', ''))
          return (
            <div
              key={item.name}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 truncate text-sm sm:text-base">{item.name}</h3>
                <p className="text-pink-600 font-bold text-sm sm:text-base">{item.price}</p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 order-last sm:order-none w-full sm:w-auto justify-center sm:justify-end mt-2 sm:mt-0">
                <button
                  onClick={() =>
                    dispatch({ type: 'UPDATE_QTY', name: item.name, quantity: item.quantity - 1 })
                  }
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-medium cursor-pointer"
                >
                  -
                </button>
                <span className="w-5 sm:w-6 text-center font-medium text-sm sm:text-base">{item.quantity}</span>
                <button
                  onClick={() =>
                    dispatch({ type: 'UPDATE_QTY', name: item.name, quantity: item.quantity + 1 })
                  }
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-medium cursor-pointer"
                >
                  +
                </button>
                <p className="font-semibold text-gray-800 w-16 sm:w-20 text-right text-sm sm:text-base">
                  ₹{price * item.quantity}
                </p>
                <button
                  onClick={() => dispatch({ type: 'REMOVE', name: item.name })}
                  className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center text-xl font-bold text-gray-800 mb-6">
          <span>Total</span>
          <span className="text-pink-600">₹{total}</span>
        </div>
        <Link
          to="/checkout"
          className="block w-full text-center bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-full transition-colors"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}
