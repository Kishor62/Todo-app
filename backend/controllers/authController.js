import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'

function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email }
}

export async function register(req, res, next) {
  try {
    const name = String(req.body.name || '').trim()
    const email = String(req.body.email || '').trim().toLowerCase()
    const password = String(req.body.password || '')
    if (!name || !email || password.length < 8) return res.status(400).json({ message: 'Name, valid email and password (at least 8 characters) are required.' })
    const existing = await User.findOne({ email })
    if (existing) return res.status(409).json({ message: 'An account with this email already exists.' })
    const user = await User.create({ name, email, password })
    res.status(201).json({ token: generateToken(user._id), user: publicUser(user) })
  } catch (error) { next(error) }
}

export async function login(req, res, next) {
  try {
    const email = String(req.body.email || '').trim().toLowerCase()
    const password = String(req.body.password || '')
    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: 'Incorrect email or password.' })
    res.json({ token: generateToken(user._id), user: publicUser(user) })
  } catch (error) { next(error) }
}

export async function me(req, res) {
  res.json({ user: publicUser(req.user) })
}
