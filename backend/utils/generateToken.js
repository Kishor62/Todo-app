import jwt from 'jsonwebtoken'

export default function generateToken(userId) {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is missing in backend/.env')
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}
