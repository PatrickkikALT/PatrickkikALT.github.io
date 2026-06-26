import { useEffect, useRef, useState } from 'react';

const CODE = [
  'f',
  'l',
  'i',
  'p',
  'j',
  'e',
];

function normalizeKey(key) {
  return key.length === 1 ? key.toLowerCase() : key;
}

export function FlipjeEasterEgg() {
  const [runId, setRunId] = useState(0);
  const [visible, setVisible] = useState(false);
  const progressRef = useRef(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = normalizeKey(event.key);
      const expected = CODE[progressRef.current];

      if (key === expected) {
        progressRef.current += 1;
        if (progressRef.current === CODE.length) {
          progressRef.current = 0;
          setRunId((id) => id + 1);
          setVisible(true);
        }
        return;
      }

      progressRef.current = key === CODE[0] ? 1 : 0;
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!visible) return null;

  return (
    <img
      key={runId}
      src="/assets/flipje.png"
      alt=""
      className="flipje"
      aria-hidden="true"
      onAnimationEnd={() => setVisible(false)}
    />
  );
}
