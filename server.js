import 'dotenv/config'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import Razorpay from 'razorpay'

const __dirname = dirname(fileURLToPath(import.meta.url))
const menu = JSON.parse(readFileSync(join(__dirname, 'src/data/menu.json'), 'utf-8'))
const priceMap = Object.fromEntries(menu.map((i) => [i.name, Number(i.price.replace('₹', ''))]))

const app = express()

const ALLOWED_ORIGINS = [
  process.env.VITE_APP_URL,
  'http://localhost:5173',
  'https://mangeshghodke.github.io',
].filter(Boolean)
app.use(cors({ origin: ALLOWED_ORIGINS }))
app.use(express.json())

const apiLimiter = rateLimit({
  windowMs: 60_000,
  max: 10,
  message: { error: 'Too many requests. Please slow down.' },
})

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
    req.user = await resp.json()
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

const razorpay = new Razorpay({
  key_id: process.env.VITE_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

app.post('/api/create-order', apiLimiter, verifyToken, async (req, res) => {
  try {
    const { items } = req.body
    if (!items?.length) {
      return res.status(400).json({ error: 'Cart is empty' })
    }

    let total = 0
    for (const item of items) {
      const expectedPrice = priceMap[item.name]
      if (expectedPrice === undefined) {
        return res.status(400).json({ error: `Unknown item: ${item.name}` })
      }
      if (item.price !== expectedPrice) {
        return res.status(400).json({ error: `Price mismatch for ${item.name}` })
      }
      total += expectedPrice * item.quantity
    }

    const order = await razorpay.orders.create({
      amount: total * 100,
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
