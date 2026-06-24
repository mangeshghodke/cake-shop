import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Razorpay from 'razorpay'

const app = express()
app.use(cors())
app.use(express.json())

const razorpay = new Razorpay({
  key_id: process.env.VITE_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

app.post('/api/create-order', async (req, res) => {
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
