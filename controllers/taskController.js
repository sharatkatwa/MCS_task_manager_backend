import Task from '../models/taskModel.js'

// READ ALL TASKS
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
    if (!tasks) {
      return res.status(404).json({ error: 'No tasks found' })
    }

    return res.status(200).json({ tasks })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: 'Title and Description cannot be empty' })
    }

    const createdTask = await Task.create({ title, description })

    return res.status(201).json({ task: createdTask })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// UPDATE TASK
export const updateTask = async (req, res) => {
  try {
    const { title, description, isCompleted } = req.body
    const { id } = req.params

    const task = await Task.findById(id)
    if (!task) {
      return res.status(400).json({ error: 'Task not found!' })
    }
    if ((!title, !description, typeof isCompleted !== 'boolean')) {
      return res.status(400).json({ error: 'all fields are required' })
    }
    task.title = title
    task.description = description
    task.isCompleted = isCompleted

    const updatedTask = await task.save()

    res.status(200).json({ task: updatedTask })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params

    const deletedTask = await Task.findByIdAndDelete(id)

    return res.status(200).json({ task: deletedTask })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
