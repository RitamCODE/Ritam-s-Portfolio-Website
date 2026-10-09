import { useLayoutEffect, useRef, useState } from 'react';

// Measures an element's content width so a layout can react to the space it actually has
// (a slide inside a card) rather than to the viewport. The first read is synchronous;
// later changes are applied on the next animation frame, so the observer callback never
// writes state while the browser is still resolving layout.
function useElementWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    setWidth(Math.round(element.clientWidth));
    if (typeof ResizeObserver === 'undefined') return undefined;

    let frame = 0;
    let latest = -1;
    const observer = new ResizeObserver(([entry]) => {
      latest = Math.round(entry.contentRect.width);
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setWidth(latest);
      });
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return [ref, width];
}

export default useElementWidth;
