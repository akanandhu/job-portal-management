require('dotenv').config()

const cors = require('cors')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000
const corsOrigin = process.env.CORS_ORIGIN || 'http://127.0.0.1:5173'

app.use(cors({ origin: corsOrigin }))
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`API listening on port ${port}`)
})
