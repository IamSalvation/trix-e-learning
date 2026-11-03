import { useRoute } from './lib/router';
import Header from './components/Header';
import ClassPicker from './routes/ClassPicker';
import SubjectList from './routes/SubjectList';
import LessonList from './routes/LessonList';
import LessonReader from './routes/LessonReader';
import { getLesson } from './lib/lessons';
import './styles/tokens.css';
import './styles/base.css';
import './App.css';

function App() {
  const route = useRoute();

  const renderScreen = () => {
    if (route.page === 'home') return <ClassPicker />;
    if (route.page === 'class') return <SubjectList classId={route.classId} />;
    if (route.page === 'subject') return <LessonList classId={route.classId} subjectId={route.subjectId} />;
    
    if (route.page === 'lesson') {
      const lesson = getLesson(route.classId, route.subjectId, route.lessonId);
      if (!lesson) return <div style={{ padding: 20 }}>Lesson not found.</div>;
      return <LessonReader key={lesson.id} lesson={lesson} />;
    }
    
    return <ClassPicker />;
  };

  return (
    <>
      <Header />
      {renderScreen()}
    </>
  );
}

export default App;
