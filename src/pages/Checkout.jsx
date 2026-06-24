/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { useCart, useCartDispatch } from '../context/CartContext'
import { loadRazorpayScript, createOrder, openRazorpayCheckout } from '../config/razorpay'

function Checkout() {
  const cart = useCart()
  const dispatch = useCartDispatch()
  const [loading, setLoading] = useState(false)
  const [paid, setPaid] = useState(false)
  const [details, setDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  const total = cart.reduce((sum, item) => {
    const price = Number(item.price.replace('₹', ''))
    return sum + price * item.quantity
  }, 0)

  function handleChange(e) {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }

  async function handlePay() {
    setLoading(true)
    try {
      const loaded = await loadRazorpayScript()
      if (!loaded) {
        alert('Failed to load payment gateway. Please try again.')
        setLoading(false)
        return
      }

      const order = await createOrder(total)
      const itemList = cart.map((i) => `${i.name} x${i.quantity}`).join(', ')

      openRazorpayCheckout({
        order,
        description: itemList,
        onSuccess: () => {
          setPaid(true)
          dispatch({ type: 'CLEAR' })
          setLoading(false)
        },
        onError: () => {
          setLoading(false)
        },
      })
    } catch {
      alert('Failed to create order. Make sure the payment server is running.')
      setLoading(false)
    }
  }

  if (paid) {
    return (
      <div className="py-24 px-4 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-2">Thank you for your order, {details.name}.</p>
        <p className="text-gray-600 mb-8">We&apos;ll start baking right away.</p>
        <Link
          to="/menu"
          className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-full transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="py-24 px-4 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Nothing to Checkout</h1>
        <p className="text-gray-600 mb-8">Your cart is empty. Add some cakes first!</p>
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
    <div className="py-12 px-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-5">Your Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={details.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={details.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={details.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                <textarea
                  name="address"
                  required
                  rows={3}
                  value={details.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors resize-none"
                  placeholder="Street, city, pincode..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-5">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cart.map((item) => {
                const price = Number(item.price.replace('₹', ''))
                return (
                  <div key={item.name} className="flex items-center gap-3">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">₹{price * item.quantity}</p>
                  </div>
                )
              })}
            </div>

            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className="text-green-600">Free</span>
              </div>
            </div>

            <div className="border-t pt-4 mt-4 flex justify-between items-center text-lg font-bold text-gray-800">
              <span>Total</span>
              <span className="text-pink-600">₹{total}</span>
            </div>

            <button
              onClick={handlePay}
              disabled={loading || !details.name || !details.email || !details.phone || !details.address}
              className="mt-6 w-full bg-pink-600 hover:bg-pink-700 disabled:bg-pink-300 text-white font-semibold py-3 rounded-full transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : `Pay ₹${total}`}
            </button>

            <Link
              to="/cart"
              className="block mt-3 text-center text-sm text-gray-500 hover:text-pink-600 transition-colors"
            >
              ← Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuthenticationRequired(Checkout, {
  onRedirecting: () => (
    <div className="py-24 text-center">
      <div className="animate-spin text-4xl mb-4">⏳</div>
      <p className="text-gray-600">Redirecting to login...</p>
    </div>
  ),
})
