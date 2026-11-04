import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { taskService } from '../services/taskService';
import { isOverdue } from '../utils/date';

const Ctx = createContext();

export const useTasks = () => useContext(Ctx);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editor, setEditor] = useState({ open: false, task: null });
  const [toDelete, setToDelete] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await taskService.list();
        setTasks(data);
      } catch (error) {
        console.error('Could not load tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const addTask = async (data) => {
    const task = await taskService.create(data);
    setTasks((previous) => [task, ...previous]);
  };

  const updateTask = async (task) => {
    const updatedTask = await taskService.update(task);
    setTasks((previous) =>
      previous.map((item) =>
        item.id === updatedTask.id ? updatedTask : item
      )
    );
  };

  const deleteTask = async (id) => {
    await taskService.remove(id);
    setTasks((previous) => previous.filter((task) => task.id !== id));
  };

  const toggleTask = async (task) => {
    await updateTask({ ...task, completed: !task.completed });
  };

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length;
    const overdue = tasks.filter(isOverdue).length;

    return {
      total: tasks.length,
      completed,
      overdue,
      pending: tasks.length - completed,
      pct: tasks.length
        ? Math.round((completed / tasks.length) * 100)
        : 0,
    };
  }, [tasks]);

  return (
    <Ctx.Provider
      value={{
        tasks,
        loading,
        stats,
        search,
        setSearch,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
        editor,
        openEditor: (task = null) => setEditor({ open: true, task }),
        closeEditor: () => setEditor({ open: false, task: null }),
        toDelete,
        askDelete: setToDelete,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}