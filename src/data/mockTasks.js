import { addDays } from '../utils/date'
export const CATEGORIES = ['Work', 'Personal', 'Design', 'Health', 'Learning']
export const PRIORITIES = ['High', 'Medium', 'Low']

const t = (title, description, category, priority, off, completed = false) =>
  ({ id: crypto.randomUUID(), title, description, category, priority, dueDate: addDays(off), completed })

export const seedTasks = () => [
  t('Finalize Q4 product roadmap', 'Align priorities with engineering and share the deck with leadership.', 'Work', 'High', 1),
  t('Review onboarding flow mockups', 'Leave feedback on the new signup screens before Friday.', 'Design', 'High', -2),
  t('Prepare investor update email', 'Summarise growth metrics and the next milestone.', 'Work', 'Medium', 3),
  t('Book dentist appointment', 'Routine check-up, ask about morning slots.', 'Health', 'Low', -1),
  t('Finish React performance course', 'Complete the final two modules on memoization.', 'Learning', 'Medium', 5),
  t('Plan weekend trip to Jaipur', 'Compare hotels and book train tickets.', 'Personal', 'Low', 6),
  t('Design system audit', 'Check spacing and colour tokens for inconsistencies.', 'Design', 'Medium', 0),
  t('Morning yoga streak', 'Complete 21 days of consecutive practice.', 'Health', 'Medium', 2, true),
  t('Send invoices to clients', 'Reconcile the October billing sheet first.', 'Work', 'High', -4, true),
  t('Read "Deep Work" chapters 4-6', 'Take notes for the team book club.', 'Learning', 'Low', 4, true),
]
