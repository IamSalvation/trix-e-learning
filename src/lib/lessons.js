// Import every lesson JSON you create here.
import p1EnglishU01M01 from '../content/primary/p1/english/u01-m01.json';
import p1EnglishU01M02 from '../content/primary/p1/english/u01-m02.json';
import p1EnglishU01M03 from '../content/primary/p1/english/u01-m03.json';
import p1EnglishU01M04 from '../content/primary/p1/english/u01-m04.json';
import p1EnglishU01M05 from '../content/primary/p1/english/u01-m05.json';
import p1EnglishU01M06 from '../content/primary/p1/english/u01-m06.json';
import p1EnglishU01M07 from '../content/primary/p1/english/u01-m07.json';
import p1EnglishU02M01 from '../content/primary/p1/english/u02-m01.json';
import p1EnglishU02M02 from '../content/primary/p1/english/u02-m02.json';
import p1EnglishU03M01 from '../content/primary/p1/english/u03-m01.json';
import p1EnglishU03M02 from '../content/primary/p1/english/u03-m02.json';
import p1EnglishU03M03 from '../content/primary/p1/english/u03-m03.json';
import p1EnglishU04M01 from '../content/primary/p1/english/u04-m01.json';
import p1EnglishU04M02 from '../content/primary/p1/english/u04-m02.json';
import p1EnglishU04M03 from '../content/primary/p1/english/u04-m03.json';
import p1EnglishU05M01 from '../content/primary/p1/english/u05-m01.json';
import p1EnglishU06M01 from '../content/primary/p1/english/u06-m01.json';
import p1EnglishU07M01 from '../content/primary/p1/english/u07-m01.json';
import p1EnglishU07M02 from '../content/primary/p1/english/u07-m02.json';

export const lessonDataMap = {
  'p1/english/u01-m01': p1EnglishU01M01,
  'p1/english/u01-m02': p1EnglishU01M02,
  'p1/english/u01-m03': p1EnglishU01M03,
  'p1/english/u01-m04': p1EnglishU01M04,
  'p1/english/u01-m05': p1EnglishU01M05,
  'p1/english/u01-m06': p1EnglishU01M06,
  'p1/english/u01-m07': p1EnglishU01M07,
  'p1/english/u02-m01': p1EnglishU02M01,
  'p1/english/u02-m02': p1EnglishU02M02,
  'p1/english/u03-m01': p1EnglishU03M01,
  'p1/english/u03-m02': p1EnglishU03M02,
  'p1/english/u03-m03': p1EnglishU03M03,
  'p1/english/u04-m01': p1EnglishU04M01,
  'p1/english/u04-m02': p1EnglishU04M02,
  'p1/english/u04-m03': p1EnglishU04M03,
  'p1/english/u05-m01': p1EnglishU05M01,
  'p1/english/u06-m01': p1EnglishU06M01,
  'p1/english/u07-m01': p1EnglishU07M01,
  'p1/english/u07-m02': p1EnglishU07M02,
};

export function getLesson(classId, subjectId, lessonId) {
  const key = classId + '/' + subjectId + '/' + lessonId;
  return lessonDataMap[key] || null;
}
