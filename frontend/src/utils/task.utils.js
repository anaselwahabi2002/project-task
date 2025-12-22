export const normalizeDate = (value) => {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  d.setHours(0, 0, 0, 0);
  return d;
};

export const isOverdueTask = (task, today) => {
  const due = normalizeDate(task?.dueDate);
  if (!due) return false;
  return due <= today && !task?.completed;
};
