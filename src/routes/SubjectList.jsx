import { curriculum } from '../lib/curriculum';
import { navigate } from '../lib/router';
import './Screens.css';

export default function SubjectList({ classId }) {
  const cls = curriculum.classes.find(function (c) { return c.id === classId; });
  if (!cls) return <div className='screen'><p>Class not found.</p></div>;

  return (
    <div className='screen'>
      <header className='screen-header'>
        <h1>{cls.name}</h1>
        <p className='screen-subtitle'>Choose a subject</p>
      </header>

      <div className='subject-list'>
        {cls.subjects.length === 0 && (
          <p className='empty-msg'>No subjects yet. Coming soon!</p>
        )}
        {cls.subjects.map(function (subj) {
          return (
            <button
              key={subj.id}
              className='subject-card'
              onClick={function () { navigate('/class/' + classId + '/subject/' + subj.id); }}
            >
              <span className='subject-icon'>{subj.icon}</span>
              <span className='subject-name'>{subj.name}</span>
              <span className='subject-count'>
                {subj.lessons.length} {subj.lessons.length === 1 ? 'lesson' : 'lessons'}
              </span>
              <span className='chevron'>→</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
