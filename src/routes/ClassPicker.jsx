import { curriculum } from '../lib/curriculum';
import { navigate } from '../lib/router';
import './Screens.css';

export default function ClassPicker() {
  let totalLessons = 0;
  curriculum.classes.forEach((cls) => {
    cls.subjects.forEach((subj) => {
      totalLessons += subj.lessons.length;
    });
  });

  return (
    <div className='screen'>
      
      <div className='welcome-banner'>
        <h1>Welcome back, Student!</h1>
        <p>Ready to learn something new today?</p>
        <div className='stats-badge'>
          📚 {totalLessons} Lessons available
        </div>
      </div>

      <h2 className='section-title'>Select your class</h2>
      
      <div className='class-grid'>
        {curriculum.classes.map((cls) => {
          const hasContent = cls.subjects.some((s) => s.lessons.length > 0);
          return (
            <button
              key={cls.id}
              className='class-card'
              style={{ '--card-color': cls.color }}
              onClick={() => hasContent && navigate('/class/' + cls.id)}
              disabled={!hasContent}
            >
              <span className='class-name'>{cls.name}</span>
              <span className='class-status'>
                {hasContent ? 'Available' : 'Coming soon'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
