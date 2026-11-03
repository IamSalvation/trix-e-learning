import { curriculum } from '../lib/curriculum';
import { navigate } from '../lib/router';
import { countTotalCompleted, countTotalLessons } from '../lib/progress';
import './Screens.css';

export default function ClassPicker() {
  const totalLessons = countTotalLessons(curriculum);
  const completed = countTotalCompleted(curriculum);
  const percent = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;

  return (
    <div className='screen'>

      <div className='welcome-banner'>
        <h1>Welcome back, Student!</h1>
        <p>Ready to learn something new today?</p>

        <div className='progress-section'>
          <div className='progress-labels'>
            <span>Your progress</span>
            <span>{completed} of {totalLessons} lessons</span>
          </div>
          <div className='progress-track'>
            <div className='progress-fill' style={{ width: percent + '%' }}></div>
          </div>
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
              onClick={() => hasContent && navigate(`/class/${cls.id}`)}
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