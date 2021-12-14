import React, { useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export const BodyTextScale = React.memo(() => {
  const [value] = useLocalStorage('text-scale', '100%');

  useEffect(() => {
    document.body.style.fontSize = value;
  }, [value]);

  return null;
});
