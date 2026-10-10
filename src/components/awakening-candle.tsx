import { useEffect, useRef } from 'react';
import { Leaf } from 'lucide-react';
import { CandleArtwork } from '@/components/candle-artwork';

/** Native motion fallback: no animation dependency is installed in this project. */
export function AwakeningCandle() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const section = scene?.closest('section');
    if (!scene || !section) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compact = window.matchMedia('(max-width: 767px), (pointer: coarse)');
    let frame = 0;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    let entered = false;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = section.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -bounds.top / Math.max(1, bounds.height - window.innerHeight * .45)));
        const arc = reduced.matches || compact.matches ? 0 : Math.sin(progress * Math.PI);
        scene.style.setProperty('--awakening-rise', `${arc * -24}px`);
        scene.style.setProperty('--awakening-scale', `${1 + arc * .14}`);
        scene.style.setProperty('--awakening-turn', `${arc * -3}deg`);
        scene.style.setProperty('--awakening-orbit-scale', `${1 + arc * .3}`);
        scene.style.setProperty('--awakening-orbit-opacity', `${.65 * (1 - progress)}`);
        scene.classList.toggle('awakening-final', progress > .86);
      });
    };
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting) && !entered) {
        entered = true;
        scene.classList.add('awakening-entered');
        settleTimer = setTimeout(() => scene.classList.add('awakening-settled'), 2800);
        observer.disconnect();
      }
    }, { threshold: .25 });
    observer.observe(scene);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    reduced.addEventListener('change', update);
    compact.addEventListener('change', update);
    update();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(settleTimer);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      reduced.removeEventListener('change', update);
      compact.removeEventListener('change', update);
    };
  }, []);

  return <div className="awakening" ref={sceneRef}>
    <div className="awakening-bloom" aria-hidden="true" />
    <div className="awakening-ring" aria-hidden="true" />
    <div className="awakening-orbits" aria-hidden="true">{[0, 1, 2].map(index => <span className={`awakening-orbit awakening-orbit-${index}`} key={index}><Leaf strokeWidth={.7} /></span>)}</div>
    <div className="awakening-scroll"><div className="awakening-entrance"><div className="awakening-float"><CandleArtwork /><div className="awakening-glass" aria-hidden="true"><span className="awakening-sweep" /></div></div></div></div>
  </div>;
}