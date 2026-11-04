import { http } from './api';

const normalizeTask = (task) => ({
  ...task,
  id: task._id || task.id,
  completed: task.status === 'Completed' || task.completed === true,
});

export const taskService = {
  async list() {
    const data = await http('/tasks');
    return data.map(normalizeTask);
  },

  async create(task) {
    const data = await http('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
    return normalizeTask(data.task);
  },

  async update(task) {
    const data = await http(`/tasks/${task.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        category: task.category,
        priority: task.priority,
        dueDate: task.dueDate,
        status: task.completed ? 'Completed' : 'Pending',
      }),
    });
    return normalizeTask(data.task);
  },

  async remove(id) {
    return await http(`/tasks/${id}`, {
      method: 'DELETE',
    });
  },
};