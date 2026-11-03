// Import every lesson JSON you create here.
import p1EnglishU01M01 from '../content/primary/p1/english/u01-m01.json';
import p1EnglishU02M01 from '../content/primary/p1/english/u02-m01.json';

// Map of "classId/subjectId/lessonId" -> JSON data
export const lessonDataMap = {
  'p1/english/u01-m01': p1EnglishU01M01,
  'p1/english/u02-m01': p1EnglishU02M01,
};

export function getLesson(classId, subjectId, lessonId) {
  const key = classId + '/' + subjectId + '/' + lessonId;
  return lessonDataMap[key] || null;
}
