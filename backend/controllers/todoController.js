import Todo from '../models/Todo.js'

export async function listTodos(req, res, next) {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json({ todos })
  } catch (error) { next(error) }
}

export async function createTodo(req, res, next) {
  try {
    const title = String(req.body.title || '').trim()
    if (!title) return res.status(400).json({ message: 'Task title is required.' })
    if (title.length > 180) return res.status(400).json({ message: 'Task title must be 180 characters or fewer.' })
    const todo = await Todo.create({ title, user: req.user._id })
    res.status(201).json({ todo })
  } catch (error) { next(error) }
}

export async function updateTodo(req, res, next) {
  try {
    const updates = {}
    if (typeof req.body.title === 'string') {
      const title = req.body.title.trim()
      if (!title || title.length > 180) return res.status(400).json({ message: 'Task title must be between 1 and 180 characters.' })
      updates.title = title
    }
    if (typeof req.body.completed === 'boolean') updates.completed = req.body.completed
    if (!Object.keys(updates).length) return res.status(400).json({ message: 'No valid fields supplied.' })
    const todo = await Todo.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, updates, { new: true, runValidators: true })
    if (!todo) return res.status(404).json({ message: 'Task not found.' })
    res.json({ todo })
  } catch (error) {
    if (error.name === 'CastError') return res.status(400).json({ message: 'Invalid task ID.' })
    next(error)
  }
}

export async function deleteTodo(req, res, next) {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    if (!todo) return res.status(404).json({ message: 'Task not found.' })
    res.json({ message: 'Task deleted.' })
  } catch (error) {
    if (error.name === 'CastError') return res.status(400).json({ message: 'Invalid task ID.' })
    next(error)
  }
}
