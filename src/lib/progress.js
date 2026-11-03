// Simple progress storage using the browser's localStorage.
// Data lives on the student's device and works fully offline.

const STORAGE_KEY = 'trix_progress';

// Get all progress as an object: { 'p1/english/u01-m01': true, ... }
export function getProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// Check if a specific lesson is completed
export function isLessonComplete(classId, subjectId, lessonId) {
  const key = classId + '/' + subjectId + '/' + lessonId;
  return !!getProgress()[key];
}

// Mark a lesson as completed
export function markLessonComplete(classId, subjectId, lessonId) {
  const key = classId + '/' + subjectId + '/' + lessonId;
  const progress = getProgress();
  progress[key] = true;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn('Could not save progress:', e);
  }
}

// Count how many lessons in a subject have been completed
export function countCompletedInSubject(subject) {
  const progress = getProgress();
  let count = 0;
  subject.lessons.forEach(function (lesson) {
    const key = 'p1/' + subject.id + '/' + lesson.id;
    if (progress[key]) count++;
  });
  return count;
}

// Count total completed across all subjects
export function countTotalCompleted(curriculum) {
  const progress = getProgress();
  let count = 0;
  Object.keys(progress).forEach(function (key) {
    if (progress[key]) count++;
  });
  return count;
}

// Count total lessons available across the curriculum
export function countTotalLessons(curriculum) {
  let total = 0;
  curriculum.classes.forEach(function (cls) {
    cls.subjects.forEach(function (subj) {
      total += subj.lessons.length;
    });
  });
  return total;
}
