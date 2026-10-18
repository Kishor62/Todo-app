import 'dotenv/config'
import app from './app.js'
import connectDB from './config/db.js'

const PORT = process.env.PORT || 5000

try {
  console.log('MongoDB URI exists:', Boolean(process.env.MONGODB_URI))
  await connectDB()
  app.listen(PORT, () => console.log(`API server running on http://localhost:${PORT}`))
} catch (error) {
  console.error('Failed to start server:', error.message)
  process.exit(1)
}
