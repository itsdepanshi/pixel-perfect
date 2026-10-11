import { useEffect, useRef } from 'react';
import candle from '@/assets/vedic-finale-candle.svg.asset.json';

/** Separate scroll, pointer, entrance and float layers never compete for transforms. */
export function FinaleAwakening() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scene = ref.current;
    const section = scene?.closest('section');
    if (!scene || !section) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compact = window.matchMedia('(max-width: 767px), (pointer: coarse)');
    let visible = false;
    let frame = 0;
    let x = 0, y = 0, targetX = 0, targetY = 0;
    const tick = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height)));
      const amount = reduced.matches ? 0 : progress;
      x += (targetX - x) * .08;
      y += (targetY - y) * .08;
      scene.style.setProperty('--finale-scale', `${1 + amount * (compact.matches ? .08 : .2)}`);
      scene.style.setProperty('--finale-rise', `${amount * (compact.matches ? -15 : -50)}px`);
      scene.style.setProperty('--finale-orbit-opacity', `${1 - amount}`);
      scene.style.setProperty('--finale-tilt-x', `${reduced.matches || compact.matches ? 0 : y}deg`);
      scene.style.setProperty('--finale-tilt-y', `${reduced.matches || compact.matches ? 0 : x}deg`);
      if (visible && !reduced.matches) frame = requestAnimationFrame(tick);
    };
    const update = () => { if (!frame) frame = requestAnimationFrame(tick); };
    const move = (event: PointerEvent) => {
      if (reduced.matches || compact.matches || event.pointerType !== 'mouse') return;
      const rect = section.getBoundingClientRect();
      targetX = Math.max(-4, Math.min(4, ((event.clientX - rect.left) / rect.width - .5) * 8));
      targetY = Math.max(-4, Math.min(4, -((event.clientY - rect.top) / rect.height - .5) * 8));
      update();
    };
    const leave = () => { targetX = 0; targetY = 0; update(); };
    const observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      scene.classList.toggle('finale-motion-visible', visible);
      if (visible) scene.classList.add('finale-awakened');
      update();
    }, { threshold: .1 });
    observer.observe(scene);
    section.addEventListener('pointermove', move, { passive: true });
    section.addEventListener('pointerleave', leave);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    reduced.addEventListener('change', update);
    compact.addEventListener('change', update);
    update();
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame);
      section.removeEventListener('pointermove', move); section.removeEventListener('pointerleave', leave);
      window.removeEventListener('scroll', update); window.removeEventListener('resize', update);
      reduced.removeEventListener('change', update); compact.removeEventListener('change', update);
    };
  }, []);
  return <div className="finale-awakening" ref={ref}>
    <div className="finale-scroll-layer">
      <div className="finale-aura" aria-hidden="true">{[0, 1, 2].map(i => <span className={`finale-aura-wave finale-aura-wave-${i}`} key={i} />)}</div>
      <div className="finale-orbits" aria-hidden="true">{[0, 1].map(i => <svg className={`finale-orbit finale-orbit-${i}`} viewBox="0 0 400 220" key={i}><ellipse cx="200" cy="110" rx="188" ry="72" /><g transform="translate(350 63) rotate(25)"><path d="M0 18 Q-8 -6 17 -15 Q23 6 0 18 M0 18 L14 -10" /></g></svg>)}</div>
      <div className="finale-particles" aria-hidden="true">{[0, 1, 2, 3].map(i => <span className={`finale-particle finale-particle-${i}`} key={i} />)}</div>
      <div className="finale-pointer-layer"><div className="finale-entrance-layer"><div className="finale-float-layer"><div className="candle-art finale-vector-art"><img src={candle.url} alt="Vedic candle with wooden lid and original botanical label" width={4000} height={3200} loading="lazy" /></div><div className="finale-shimmer" aria-hidden="true"><span /></div></div></div></div>
    </div>
  </div>;
}