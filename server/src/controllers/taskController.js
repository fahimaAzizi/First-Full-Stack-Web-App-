const prisma = require("../prisma");

// CREATE TASK
async function createTask(req, res) {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    const task = await prisma.task.create({
      data: {
        title: title.trim(),
        description: description || null,
        userId: req.userId,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create task",
    });
  }
}

// GET ALL TASKS FOR LOGGED-IN USER
async function getTasks(req, res) {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: req.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get tasks",
    });
  }
}

// GET ONE TASK
async function getTask(req, res) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid task ID",
      });
    }

    const task = await prisma.task.findFirst({
      where: {
        id: id,
        userId: req.userId,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get task",
    });
  }
}

// UPDATE TASK
async function updateTask(req, res) {
  try {
    const id = Number(req.params.id);
    const { title, description, completed } = req.body;

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid task ID",
      });
    }

    const existingTask = await prisma.task.findFirst({
      where: {
        id: id,
        userId: req.userId,
      },
    });

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (title !== undefined && title.trim() === "") {
      return res.status(400).json({
        message: "Task title cannot be empty",
      });
    }

    const task = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        title:
          title !== undefined
            ? title.trim()
            : existingTask.title,

        description:
          description !== undefined
            ? description
            : existingTask.description,

        completed:
          completed !== undefined
            ? completed
            : existingTask.completed,
      },
    });

    res.json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update task",
    });
  }
}

// DELETE TASK
async function deleteTask(req, res) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid task ID",
      });
    }

    const existingTask = await prisma.task.findFirst({
      where: {
        id: id,
        userId: req.userId,
      },
    });

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await prisma.task.delete({
      where: {
        id: id,
      },
    });

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete task",
    });
  }
}

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};