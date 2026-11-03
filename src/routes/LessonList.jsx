import { curriculum } from '../lib/curriculum';
import { navigate } from '../lib/router';
import './Screens.css';

export default function LessonList({ classId, subjectId }) {
  const cls = curriculum.classes.find(function (c) { return c.id === classId; });
  const subj = cls ? cls.subjects.find(function (s) { return s.id === subjectId; }) : null;

  if (!subj) return <div className='screen'><p>Subject not found.</p></div>;

  return (
    <div className='screen'>
      <header className='screen-header'>
        <h1>{subj.name}</h1>
        <p className='screen-subtitle'>
          {cls.name} — {subj.lessons.length} lesson{subj.lessons.length !== 1 ? 's' : ''}
        </p>
      </header>

      <div className='lesson-list'>
        {subj.lessons.map(function (lesson, i) {
          return (
            <button
              key={lesson.id}
              className='lesson-card'
              onClick={function () { navigate('/class/' + classId + '/subject/' + subjectId + '/lesson/' + lesson.id); }}
            >
              <span className='lesson-num'>{i + 1}</span>
              <span className='lesson-title'>{lesson.title}</span>
              <span className='chevron'>→</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
