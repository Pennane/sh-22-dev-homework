import { useRef, useEffect } from 'react';

export const useInterval = (callback: () => void, delay: number): void => {
  const callbackRef = useRef<() => void>();

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    const id = setInterval(() => {
      if (callbackRef.current) callbackRef.current();
    }, delay);
    return () => clearInterval(id);
  }, []);
};
