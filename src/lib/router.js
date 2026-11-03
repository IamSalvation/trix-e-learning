import { useEffect, useState } from 'react';

export function useRoute() {
  const [route, setRoute] = useState(function () { return parseRoute(); });

  useEffect(function () {
    const onHashChange = function () { setRoute(parseRoute()); };
    window.addEventListener('hashchange', onHashChange);
    return function () { window.removeEventListener('hashchange', onHashChange); };
  }, []);

  return route;
}

function parseRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const parts = hash.split('/').filter(Boolean);

  if (parts.length === 0) return { page: 'home' };

  if (parts[0] === 'class' && parts[1]) {
    if (parts[2] === 'subject' && parts[3]) {
      if (parts[4] === 'lesson' && parts[5]) {
        return {
          page: 'lesson',
          classId: parts[1],
          subjectId: parts[3],
          lessonId: parts[5],
        };
      }
      return { page: 'subject', classId: parts[1], subjectId: parts[3] };
    }
    return { page: 'class', classId: parts[1] };
  }
  return { page: 'home' };
}

export function navigate(path) {
  window.location.hash = path;
}
