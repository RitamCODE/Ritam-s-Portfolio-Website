import { useLayoutEffect, useRef, useState } from 'react';

// Measures an element's content width so a layout can react to the space it actually has
// (a slide inside a card) rather than to the viewport.
function useElementWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    setWidth(Math.round(element.clientWidth));
    if (typeof ResizeObserver === 'undefined') return undefined;

    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, width];
}

export default useElementWidth;
