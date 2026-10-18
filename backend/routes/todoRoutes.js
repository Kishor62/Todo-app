import { Router } from 'express'
import protect from '../middleware/authMiddleware.js'
import { createTodo, deleteTodo, listTodos, updateTodo } from '../controllers/todoController.js'

const router = Router()
router.use(protect)
router.get('/', listTodos)
router.post('/', createTodo)
router.patch('/:id', updateTodo)
router.delete('/:id', deleteTodo)
export default router
