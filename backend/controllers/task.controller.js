const TaskService = require("../services/task.service");

const TaskServiceInstance = new TaskService();

const getTasks = async (req, res) => {
  try {
    const { date } = req.query;
    const query = date ? { deadline: new Date(date) } : {};
    const tasks = await TaskServiceInstance.find(query);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, deadline } = req.body;

    let linkedFile = null;
    if (req.file) {
      linkedFile = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const body = { title, description, deadline, linkedFile };
    const newTask = await TaskServiceInstance.create(body);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TaskServiceInstance.update(id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TaskServiceInstance.delete(id);
    res.status(204).send(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
