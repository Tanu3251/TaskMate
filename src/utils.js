export const todayStr = () => new Date().toISOString().slice(0, 10);
export const isOverdue = (t) => !t.completed && t.dueDate && t.dueDate < todayStr();
export const statusOf = (t) => (t.completed ? 'completed' : isOverdue(t) ? 'overdue' : 'pending');
export const formatDue = (s) => {
  if (!s) return 'No date';
  const diff = Math.round((new Date(s) - new Date(todayStr())) / 864e5);
  if (diff === 0) return 'Today'; if (diff === 1) return 'Tomorrow'; if (diff === -1) return 'Yesterday';
  return new Date(s).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};
