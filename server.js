import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Razorpay from 'razorpay'

const app = express()
app.use(cors())
app.use(express.json())

async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid token' })
  }

  try {
    const token = authHeader.slice(7)
    const resp = await fetch(
      `https://${process.env.VITE_AUTH0_DOMAIN}/userinfo`,
      { headers: { Authorization: `Bearer ${token}` } },
    )
    if (!resp.ok) throw new Error('Token validation failed')
    const user = await resp.json()
    req.user = user
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

const razorpay = new Razorpay({
  key_id: process.env.VITE_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

app.post('/api/create-order', verifyToken, async (req, res) => {
  try {
    const { amount } = req.body
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    })
    res.json(order)
  } catch (err) {
    console.error('Razorpay order error:', err)
    res.status(500).json({ error: 'Failed to create order' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
