import { useEffect, useRef, useState } from 'react';

export function useVedicScene() {
  const pageRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [ritualStep, setRitualStep] = useState(0);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 480);
        if (!reduced) {
          const progress = Math.min(window.scrollY / 800, 1);
          root.style.setProperty('--lift', `${progress * 45}px`);
          root.style.setProperty('--candle-scale', `${1 + progress * .12}`);
          root.style.setProperty('--smoke-opacity', `${progress * .3}`);
        }
        const steps = root.querySelectorAll<HTMLElement>('[data-ritual-step]');
        let active = 0;
        steps.forEach((step, index) => {
          if (step.getBoundingClientRect().top < window.innerHeight * .6) active = index;
        });
        setRitualStep(active);
      });
    };
    const observer = new IntersectionObserver((entries) => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    root.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || reduced) return;
      const cursor = cursorRef.current;
      if (cursor) {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
        cursor.classList.toggle('expanded', Boolean((event.target as Element).closest('a,button,.hero-object')));
      }
      root.style.setProperty('--parallax-x', `${(event.clientX / window.innerWidth - .5) * 10}px`);
      root.style.setProperty('--parallax-y', `${(event.clientY / window.innerHeight - .5) * 7}px`);
    };
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('pointermove', move, { passive: true });
    updateScroll();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener('scroll', updateScroll); window.removeEventListener('pointermove', move); };
  }, []);
  return { pageRef, cursorRef, scrolled, ritualStep };
}