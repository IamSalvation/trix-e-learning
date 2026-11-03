import { useState } from 'react';
import { curriculum } from '../lib/curriculum';
import { navigate } from '../lib/router';
import './LessonReader.css';

export default function LessonReader({ lesson }) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (qIndex, oIndex) => {
    if (submitted) return;
    setAnswers({ ...answers, [qIndex]: oIndex });
  };

  const calculateScore = () => {
    let correct = 0;
    lesson.quiz.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });
    return Math.round((correct / lesson.quiz.length) * 100);
  };

  const score = submitted ? calculateScore() : 0;
  const passed = score >= lesson.passMark;
  const allAnswered = Object.keys(answers).length === lesson.quiz.length;

  return (
    <div className="lesson-container">
      <header className="lesson-header">
        <span className="unit-badge">Unit {lesson.unit}</span>
        <h1>{lesson.unitTitle}</h1>
        <p className="lesson-title">{lesson.title}</p>

        {lesson.objectives?.length > 0 && (
          <div className="objectives">
            <h3>By the end of this lesson, you will:</h3>
            <ul>
              {lesson.objectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main className="lesson-content">
        {lesson.blocks.map((block, i) => {
          if (block.type === 'heading') {
            return <h2 key={i} className="block-heading">{block.text}</h2>;
          }
          if (block.type === 'image') {
            return (
              <figure key={i} className="block-image">
                <img src={block.src} alt={block.alt} loading="lazy" />
                {block.caption && <figcaption>{block.caption}</figcaption>}
              </figure>
            );
          }
          if (block.type === 'dialogue') {
            return (
              <div key={i} className="block-dialogue">
                {block.lines.map((line, j) => (
                  <div key={j} className="dialogue-line">
                    <span className="speaker">{line.speaker}:</span>
                    <span className="text">{line.text}</span>
                  </div>
                ))}
              </div>
            );
          }
          if (block.type === 'callout') {
            return (
              <div key={i} className="block-callout">
                <div dangerouslySetInnerHTML={{ __html: formatMarkdown(block.md) }} />
              </div>
            );
          }
          return null;
        })}

        {!quizStarted ? (
          <div className="quiz-prompt">
            <h3>Ready to test what you learned?</h3>
            <button onClick={() => setQuizStarted(true)} className="btn-primary">
              Start Quiz →
            </button>
          </div>
        ) : (
          <div className="quiz-section">
            <h3>Quick Quiz</h3>

            {submitted && (
              <div className={`quiz-result ${passed ? 'pass' : 'fail'}`}>
                <h4>{passed ? 'Great job!' : 'Keep trying!'}</h4>
                <p>
                  You scored {score}%.{' '}
                  {passed
                    ? 'You can move to the next lesson!'
                    : `You need ${lesson.passMark}% to pass.`}
                </p>
              </div>
            )}

            {lesson.quiz.map((q, i) => (
              <div key={i} className="quiz-question">
                <p className="question-text">{i + 1}. {q.q}</p>
                <div className="options">
                  {q.options.map((opt, j) => {
                    let className = 'option-btn';
                    if (submitted) {
                      if (j === q.answer) className += ' correct';
                      else if (j === answers[i]) className += ' wrong';
                    } else if (answers[i] === j) {
                      className += ' selected';
                    }
                    return (
                      <button
                        key={j}
                        className={className}
                        onClick={() => handleAnswer(i, j)}
                        disabled={submitted}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {submitted && answers[i] !== q.answer && (
                  <p className="explain">Hint: {q.explain}</p>
                )}
              </div>
            ))}

            {!submitted && (
              <button
                onClick={() => setSubmitted(true)}
                className="btn-primary"
                disabled={!allAnswered}
              >
                Submit Answers
              </button>
            )}

            {submitted && passed && (
              <NextLessonButton lesson={lesson} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function formatMarkdown(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function NextLessonButton({ lesson }) {
  let currentClass = null;
  let currentSubject = null;

  // Smart matching: check if the lesson ID contains the curriculum ID,
  // or if they match exactly.
  const matchesLesson = (curriculumLesson) => {
    return (
      lesson.id === curriculumLesson.id ||
      lesson.id.includes(curriculumLesson.id) ||
      curriculumLesson.json === lesson.id + '.json'
    );
  };

  // Find the class and subject that contains this lesson
  for (const cls of curriculum.classes) {
    for (const subj of cls.subjects) {
      const found = subj.lessons.some(matchesLesson);
      if (found) {
        currentClass = cls;
        currentSubject = subj;
        break;
      }
    }
    if (currentClass) break;
  }

  if (!currentClass || !currentSubject) return null;

  // Find the index of the current lesson
  const currentIndex = currentSubject.lessons.findIndex(matchesLesson);
  const nextLesson = currentSubject.lessons[currentIndex + 1];

  // If there is no next lesson, show the "finished" button
  if (!nextLesson) {
    return (
      <button
        className="btn-primary"
        style={{ marginTop: 20 }}
        onClick={() => navigate('/class/' + currentClass.id)}
      >
        🎉 You finished this unit! Back to subjects →
      </button>
    );
  }

  // Otherwise, show the "Next Lesson" button
  return (
    <button
      className="btn-primary"
      style={{ marginTop: 20 }}
      onClick={() =>
        navigate(
          '/class/' + currentClass.id + '/subject/' + currentSubject.id + '/lesson/' + nextLesson.id
        )
      }
    >
      Next Lesson: {nextLesson.title} →
    </button>
  );
}