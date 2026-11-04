const pad = (n) => String(n).padStart(2, '0');

export const toISO = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const todayISO = () => toISO(new Date());

export const addDays = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return toISO(d);
};

// Supports both date-only and MongoDB ISO date formats
const dateOnly = (value) => {
  if (!value) return '';
  return String(value).slice(0, 10);
};

export const isOverdue = (t) =>
  !t.completed &&
  dateOnly(t.dueDate) !== '' &&
  dateOnly(t.dueDate) < todayISO();

export const formatDate = (iso) => {
  const date = dateOnly(iso);
  if (!date) return '';

  const [year, month, day] = date.split('-').map(Number);

  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const dayDiff = (iso) => {
  const date = dateOnly(iso);
  if (!date) return 0;

  const [year, month, day] = date.split('-').map(Number);
  const target = Date.UTC(year, month - 1, day);

  const [todayYear, todayMonth, todayDay] = todayISO()
    .split('-')
    .map(Number);

  const today = Date.UTC(todayYear, todayMonth - 1, todayDay);

  return Math.round((target - today) / 864e5);
};

export const relative = (iso) => {
  const d = dayDiff(iso);

  return d === 0
    ? 'Today'
    : d === 1
    ? 'Tomorrow'
    : d === -1
    ? 'Yesterday'
    : d < 0
    ? `${-d} days ago`
    : `In ${d} days`;
};