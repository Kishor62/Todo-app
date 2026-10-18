import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

const app = express()
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json({ limit: '20kb' }))
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))
app.use('/api/auth', authRoutes)
app.use('/api/todos', todoRoutes)
app.use(notFound)
app.use(errorHandler)

export default app
