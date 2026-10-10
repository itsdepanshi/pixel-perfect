import { useEffect, useRef } from 'react';
import { Leaf } from 'lucide-react';
import { CandleArtwork } from '@/components/candle-artwork';

export function HeroAwakening() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const object = ref.current;
    const hero = object?.closest<HTMLElement>('.hero');
    if (!object || !hero) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 767px), (pointer: coarse)');
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = hero.getBoundingClientRect();
        const p = reduced.matches ? 0 : Math.max(0, Math.min(1, -bounds.top / bounds.height));
        const arc = Math.sin(p * Math.PI);
        hero.style.setProperty('--hero-growth', `${1 + arc * (mobile.matches ? .12 : .35)}`);
        hero.style.setProperty('--hero-rise', `${arc * (mobile.matches ? -12 : -40)}px`);
        hero.style.setProperty('--hero-turn', `${arc * -3}deg`);
        hero.style.setProperty('--hero-heading-rise', `${p * -60}px`);
        hero.style.setProperty('--hero-copy-opacity', `${1 - p * .7}`);
        hero.style.setProperty('--hero-light-growth', `${1 + p * .8}`);
        hero.style.setProperty('--hero-ring-opacity', `${1 - p}`);
        hero.classList.toggle('hero-burst', p > .4 && p < .9 && !reduced.matches);
        hero.classList.toggle('hero-motion-visible', bounds.bottom > 0 && bounds.top < window.innerHeight);
      });
    };
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        hero.classList.add('hero-awakened');
        observer.disconnect();
      }
    }, { threshold: .15 });
    observer.observe(object);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    reduced.addEventListener('change', update);
    mobile.addEventListener('change', update);
    update();
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      reduced.removeEventListener('change', update);
      mobile.removeEventListener('change', update);
    };
  }, []);
  return <div className="hero-object hero-cinematic-object" ref={ref}>
    <div className="hero-light" aria-hidden="true" />
    <div className="hero-light-waves" aria-hidden="true">{[0, 1, 2].map(i => <span key={i} className={`hero-wave hero-wave-${i}`} />)}</div>
    <div className="hero-orbit-system" aria-hidden="true">{[0, 1, 2].map(i => <svg key={i} className={`hero-orbit hero-orbit-${i}`} viewBox="0 0 400 220"><ellipse cx="200" cy="110" rx="190" ry="75" /><g transform="translate(350 58) rotate(25)"><path d="M0 18 Q-8 -6 17 -15 Q23 6 0 18 M0 18 L14 -10" /></g></svg>)}</div>
    <div className="hero-product-reveal"><CandleArtwork eager /><div className="hero-glass-light" aria-hidden="true"><span /></div></div>
    <div className="hero-botanical-burst" aria-hidden="true">{[0, 1, 2, 3].map(i => <span className={`hero-burst-leaf hero-burst-leaf-${i}`} key={i}><Leaf strokeWidth={.8} /></span>)}{[0, 1, 2].map(i => <i className={`hero-dust hero-dust-${i}`} key={i} />)}</div>
  </div>;
}