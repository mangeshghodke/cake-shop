const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_XXXXXXXXXXXX'

export function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true)
      return
    }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export async function createOrder(amount, token) {
  const res = await fetch('/api/create-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount }),
  })
  if (!res.ok) throw new Error('Failed to create order')
  return res.json()
}

export function openRazorpayCheckout({ order, description, onSuccess, onError }) {
  const options = {
    key: RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: 'Sweet Delights',
    description: description || 'Cake Shop Order',
    order_id: order.id,
    handler: function (response) {
      onSuccess(response)
    },
    modal: {
      ondismiss: function () {
        onError?.(new Error('Payment cancelled'))
      },
    },
    prefill: {
      contact: '',
      email: '',
    },
    theme: {
      color: '#db2777',
    },
  }

  const rzp = new window.Razorpay(options)
  rzp.open()
}
