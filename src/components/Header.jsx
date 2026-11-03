import { useRoute, navigate } from '../lib/router';

export default function Header() {
  const route = useRoute();
  const isHome = route.page === 'home';

  const handleBack = () => {
    if (route.page === 'lesson') {
      navigate('/class/' + route.classId + '/subject/' + route.subjectId);
    } else if (route.page === 'subject') {
      navigate('/class/' + route.classId);
    } else {
      navigate('/');
    }
  };

  return (
    <header className='app-header'>
      <div className='header-inner'>
        {isHome ? (
          <div className='header-logo'>
            <span className='logo-icon'>🎓</span>
            <span className='logo-text'>Trix</span>
          </div>
        ) : (
          <button className='header-back' onClick={handleBack}>
            ← Back
          </button>
        )}
        <div className='header-title'>E-Learning</div>
      </div>
    </header>
  );
}
