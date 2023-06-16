import express from 'express'
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js'

const router = express.Router()

router.get('/', getAllTasks)
router.post('/add', createTask)
router.patch('/update/:id', updateTask)
router.delete('/delete/:id', deleteTask)

export default router
