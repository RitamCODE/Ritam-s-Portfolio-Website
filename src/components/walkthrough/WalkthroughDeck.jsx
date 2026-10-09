import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

const SETTLE_MS = 140;

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// A horizontally scrolling deck that shows one slide at a time with the edge of the next
// one peeking in. Scroll-snap does the swiping; the arrows, dots and keyboard drive the
// same scroll position, and a debounced scroll listener keeps the counter in step with
// whatever moved it. The deck stays mounted while collapsed, so the selected slide and
// each slide's local state survive a collapse.
//
// By default the track is as tall as its tallest slide and every slide stretches to match.
// `adaptiveHeight` is the opt-in alternative: slides keep their natural height and the track
// follows the active slide, re-measured whenever that slide's size changes.
function WalkthroughDeck({ id, label, heading, note, expanded, slides, adaptiveHeight = false }) {
  const trackRef = useRef(null);
  const slideRefs = useRef([]);
  const settleTimer = useRef(0);
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const lastTrackWidth = useRef(0);
  // Where an in-flight programmatic scroll is headed ({ left, expires }). The settle
  // handler waits for it, so a stalled animation frame cannot be mistaken for the scroll
  // having finished; the expiry stops it waiting on a target that is never reached.
  const scrollTarget = useRef(null);

  const [trackHeight, setTrackHeight] = useState(null);

  const last = slides.length - 1;

  const offsetOf = useCallback(
    (index) => slideRefs.current[index].offsetLeft - slideRefs.current[0].offsetLeft,
    []
  );

  const go = useCallback(
    (target, smooth = true) => {
      const index = Math.max(0, Math.min(last, target));
      const animate = smooth && !reducedMotion();
      currentRef.current = index;
      scrollTarget.current = animate ? { left: offsetOf(index), expires: Date.now() + 1500 } : null;
      setCurrent(index);
      trackRef.current?.scrollTo({ left: offsetOf(index), behavior: animate ? 'smooth' : 'auto' });
    },
    [last, offsetOf]
  );

  // Reopening lands on the slide that was selected when the deck was collapsed.
  useEffect(() => {
    if (!expanded) return undefined;
    const frame = window.requestAnimationFrame(() => go(currentRef.current, false));
    return () => window.cancelAnimationFrame(frame);
  }, [expanded, go]);

  // The slide's own size changes with navigation, resizes, web fonts loading and any
  // interaction that swaps its content, so observing it covers all of them.
  useLayoutEffect(() => {
    if (!adaptiveHeight) return undefined;
    const track = trackRef.current;
    const slide = slideRefs.current[current];
    if (!track || !slide) return undefined;

    const measure = () => {
      const style = window.getComputedStyle(track);
      const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
      setTrackHeight(Math.ceil(slide.getBoundingClientRect().height + padding));
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return undefined;

    const observer = new ResizeObserver(measure);
    observer.observe(slide);
    return () => observer.disconnect();
  }, [adaptiveHeight, current]);

  // A width change moves every snap point; put the current slide back under the edge.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof ResizeObserver === 'undefined') return undefined;

    const observer = new ResizeObserver(() => {
      const width = track.clientWidth;
      if (width > 0 && width !== lastTrackWidth.current) {
        lastTrackWidth.current = width;
        go(currentRef.current, false);
      }
    });
    observer.observe(track);
    return () => observer.disconnect();
  }, [go]);

  useEffect(() => () => window.clearTimeout(settleTimer.current), []);

  const handleScroll = () => {
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      const track = trackRef.current;
      if (!track) return;
      if (scrollTarget.current !== null) {
        const { left, expires } = scrollTarget.current;
        if (Math.abs(track.scrollLeft - left) > 2 && Date.now() < expires) {
          handleScroll();
          return;
        }
        scrollTarget.current = null;
      }
      let nearest = 0;
      let nearestDistance = Infinity;
      slides.forEach((_, index) => {
        const distance = Math.abs(offsetOf(index) - track.scrollLeft);
        if (distance < nearestDistance) {
          nearest = index;
          nearestDistance = distance;
        }
      });
      currentRef.current = nearest;
      setCurrent(nearest);
    }, SETTLE_MS);
  };

  // The visitor taking over cancels the animation's claim on the counter.
  const releaseTarget = () => {
    scrollTarget.current = null;
  };

  // Only when the track itself has focus, so arrow keys on a slide's own buttons are
  // never taken over.
  const handleKeyDown = (event) => {
    if (event.target !== event.currentTarget) return;
    const at = currentRef.current;
    const moves = { ArrowRight: at + 1, ArrowLeft: at - 1, Home: 0, End: last };
    if (!(event.key in moves)) return;
    event.preventDefault();
    go(moves[event.key]);
  };

  const active = slides[current];

  return (
    <div className={`walkthrough ${expanded ? 'is-open' : ''}`} id={id}>
      <div className="walkthrough-clip">
        <div className="walkthrough-deck">
          <div className="walkthrough-top">
            <span className="walkthrough-heading">
              <i className="fa-solid fa-layer-group" aria-hidden="true" />
              {heading}
            </span>
            <span className="walkthrough-position" aria-live="polite" aria-atomic="true">
              {active.chapter} · {current + 1} / {slides.length}
            </span>
          </div>

          <div
            className={`walkthrough-track ${adaptiveHeight ? 'is-adaptive' : ''}`}
            style={adaptiveHeight && trackHeight ? { height: trackHeight } : undefined}
            ref={trackRef}
            role="region"
            aria-roledescription="carousel"
            aria-label={label}
            tabIndex={0}
            onScroll={handleScroll}
            onPointerDown={releaseTarget}
            onWheel={releaseTarget}
            onTouchStart={releaseTarget}
            onKeyDown={handleKeyDown}
          >
            {slides.map((slide, index) => (
              <section
                key={slide.key}
                ref={(node) => {
                  slideRefs.current[index] = node;
                }}
                className="walkthrough-slide"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${slides.length}: ${slide.chapter}`}
              >
                {slide.content}
              </section>
            ))}
          </div>

          <div className="walkthrough-footer">
            <div className="walkthrough-dots" role="group" aria-label="Choose a slide">
              {slides.map((slide, index) => (
                <button
                  key={slide.key}
                  type="button"
                  className="walkthrough-dot"
                  aria-label={`Slide ${index + 1}: ${slide.chapter}`}
                  aria-current={index === current ? 'true' : undefined}
                  title={slide.chapter}
                  onClick={() => go(index)}
                />
              ))}
            </div>
            <div className="walkthrough-nav">
              <span className="walkthrough-hint" aria-hidden="true">
                Scroll or swipe to look under the hood
              </span>
              <button
                type="button"
                className="walkthrough-arrow"
                aria-label="Previous slide"
                disabled={current === 0}
                onClick={() => go(currentRef.current - 1)}
              >
                <i className="fa-solid fa-arrow-left" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="walkthrough-arrow"
                aria-label="Next slide"
                disabled={current === last}
                onClick={() => go(currentRef.current + 1)}
              >
                <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </button>
            </div>
          </div>

          <p className="walkthrough-note">{note}</p>
        </div>
      </div>
    </div>
  );
}

export default WalkthroughDeck;
