import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Leaf, Wind, Flame, Heart, Menu, X, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { CandleArtwork, type CandleMood } from '@/components/candle-artwork';
import { AwakeningCandle } from '@/components/awakening-candle';
import { HeroAwakening } from '@/components/hero-awakening';
import { FinaleAwakening } from '@/components/finale-awakening';
import { useVedicScene } from '@/hooks/use-vedic-scene';
import botanical from '@/assets/vedic-botanical.jpg';
import heroBotanical from '@/assets/vedic-hero-botanical.jpg';
import vedicLogo from '@/assets/vedic-logo-transparent.svg';
import vedicLogoDark from '@/assets/vedic-logo-dark.svg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Vedic — Light up the Vibe' },
    { name: 'description', content: 'Enter the world of Vedic. A mindful candle ritual inspired by nature, purity, and ancient Indian wisdom.' },
    { property: 'og:title', content: 'Vedic — Light up the Vibe' },
    { property: 'og:description', content: 'Bring a little ritual into your everyday. Discover the story and moods of Vedic.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

const moods = [
  { name: 'Calm', subtitle: 'A moment to simply be.', mood: 'Quiet · Restful · Gentle', story: 'Let the day soften at its edges. An invitation to slow down, breathe deeply, and return to yourself.' },
  { name: 'Ground', subtitle: 'Come back to your roots.', mood: 'Rooted · Still · Present', story: 'Find your footing in the familiar. A small ritual for feeling connected to the earth and the present moment.' },
  { name: 'Glow', subtitle: 'Make room for a little light.', mood: 'Warm · Open · Joyful', story: 'For the everyday moments that deserve a little warmth. Welcome a softer light and let it linger.' },
  { name: 'Balance', subtitle: 'Find your own kind of harmony.', mood: 'Centered · Mindful · Soft', story: 'A pause between doing and being. Meet yourself in the middle, and make space for a gentler rhythm.' },
] satisfies { name: CandleMood; subtitle: string; mood: string; story: string }[];
const chapters = ['Home', 'Story', 'Ritual', 'Collection', 'About'];
function Brand({ dark = false }: { dark?: boolean }) { return <span className="brand-sign"><img className="brand-logo" src={dark ? vedicLogoDark : vedicLogo} alt="Vedic" width={252} height={144} /></span>; }
function RevealWords({ text }: { text: string }) { return <span className="letter-reveal" aria-label={text}>{Array.from(text).map((letter, index) => <span aria-hidden="true" key={index}>{letter === ' ' ? '\u00a0' : letter}</span>)}</span>; }

function Index() {
  const { pageRef, cursorRef, scrolled, ritualStep } = useVedicScene();
  const [selected, setSelected] = useState<number | null>(null);
  const [contact, setContact] = useState(false);
  const [menu, setMenu] = useState(false);
  const mood = selected === null ? null : moods[selected];
  const navigation = (floating = false) => <nav aria-label={floating ? 'Floating navigation' : 'Main navigation'} className={`quiet-nav ${floating ? `floating-nav ${scrolled ? 'visible' : ''}` : ''}`}>
    {chapters.map((chapter, index) => <Button variant="ritual" asChild key={chapter} className={index === 0 || index === 4 ? 'extra-nav' : ''}><a className="nav-link" href={`#${chapter.toLowerCase()}`} onClick={() => setMenu(false)}>{chapter}</a></Button>)}
    <Button variant="ritual" className="nav-link" onClick={() => { setContact(true); setMenu(false); }}>Contact <ArrowUpRight /></Button>
  </nav>;

  return <div className="vedic-page" ref={pageRef}>
    <div ref={cursorRef} className="cursor" aria-hidden="true" />
    <header className="site-header">
      <Button variant="ritual" asChild><a href="#home" aria-label="Vedic home"><Brand dark /></a></Button>
      {navigation()}
      <Button variant="ritual" className="mobile-menu" aria-label={menu ? 'Close navigation' : 'Open navigation'} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</Button>
      {menu && <div className="menu-panel">{navigation()}</div>}
    </header>
    {navigation(true)}
    <main>
      <section id="home" className="hero" aria-label="The world of Vedic">
        <img className="hero-background" src={heroBotanical} width={1536} height={1024} alt="" aria-hidden="true" />
        <div className="hero-kicker"><span className="eyebrow">Rooted in nature. Made for the soul.</span><h1 className="hero-title">VEDIC</h1></div>
        <span className="vertical-note eyebrow">A little light. A deeper connection.</span>
        <div className="hero-index eyebrow">01 <span /> 06</div>
        <div className="hero-editorial hero-editorial-left"><span className="hero-editorial-rule" aria-hidden="true" /><p>01 — THE ART OF SLOWING DOWN</p></div>
        <div className="hero-editorial hero-editorial-right"><span className="hero-editorial-rule" aria-hidden="true" /><p>NATURE · RITUAL · STILLNESS</p></div>
        <HeroAwakening />
        <div className="hero-caption"><p>Light up the Vibe with Vedic</p><Button variant="ritual" asChild><a href="#story" className="ritual-link">Enter the ritual <ArrowDown /></a></Button></div>
        <div className="hero-bottom"><span className="eyebrow">Purity in every light.<br />Presence in every moment.</span><span className="eyebrow">Inspired by ancient wisdom<br />Designed for everyday rituals</span></div>
      </section>

      <section id="story" className="chapter story">
        <div className="reveal"><div className="chapter-head eyebrow">01 / Our story</div><h2><RevealWords text="Why Vedic?" /><br /><em>A return to what<br />feels natural.</em></h2><p className="story-copy">Vedic evokes purity, tradition and wellness — a natural, mindful candle brand rooted in ancient wisdom.</p><p className="story-copy">Our leaf symbolizes purity, nature and sustainability — reflecting our commitment to eco-friendly, plant-based candle making.</p><Button variant="ritual" asChild><a href="#ritual" className="ritual-link mt-6">Find your moment <ArrowDown /></a></Button></div>
        <div className="story-image reveal"><img className="story-photo" src={botanical} alt="Olive branches and soft natural light on linen" width={1920} height={1280} loading="lazy" /><p className="eyebrow">Nature, our first inspiration.</p></div>
      </section>

      <section id="ritual" className="chapter ritual-section">
        <div className="chapter-head eyebrow">02 / The art of slowing down</div>
        <div className="ritual-layout"><div className="ritual-scene" data-step={ritualStep}><h2>The Vedic<br /><em>Ritual.</em></h2><AwakeningCandle /><div className="ritual-mark" aria-hidden="true">{ritualStep === 0 ? <Flame strokeWidth={1} /> : ritualStep === 1 ? <Wind strokeWidth={1} /> : <Heart strokeWidth={1} />}</div><span className="eyebrow">One candle. A thousand little moments.</span></div>
          <div>{[
            ['Light', 'Strike a match. Let the light mark a gentle beginning. Leave the rush of the day behind.'],
            ['Breathe', 'A little less noise. A little more space. Take a slow breath and settle into this moment.'],
            ['Feel', 'Let warmth become a feeling. Nothing to chase. Nowhere else to be. Just you, here.'],
          ].map(([title, copy], index) => <article className={`ritual-step ${ritualStep === index ? 'active' : ''}`} data-ritual-step={index} key={title}><span className="eyebrow">0{index + 1} / The ritual</span><h3>{title}<em>.</em></h3><p>{copy}</p></article>)}</div>
        </div>
      </section>

      <section id="collection" className="chapter collection">
        <div className="chapter-head eyebrow">03 / A collection of feelings</div>
        <div className="collection-title reveal"><h2>Not just a candle.<br /><em>A state of mind.</em></h2><p>Find the feeling you want to come home to.</p></div>
        <div className="mood-grid">{moods.map((item, index) => <article className="mood reveal" key={item.name}><Button variant="ritual" className="mood-button" onClick={() => setSelected(index)} aria-label={`Explore ${item.name}`}><div className="mood-stage"><span className="eyebrow">0{index + 1} / Vedic moods</span><CandleArtwork mood={item.name} /><span className="mood-discover"><ArrowUpRight /></span></div><div className="mood-caption"><div><h3>{item.name}</h3><p>{item.subtitle}</p></div><span>Explore the feeling</span></div></Button></article>)}</div>
      </section>

      <section id="about" className="about-strip" aria-label="Vedic values"><div><Leaf />Rooted in nature</div><div><Sprout />Mindfully made</div><div><Heart />Inspired by ancient wisdom</div><div><Wind />A gentler everyday</div></section>
      <section className="finale" id="contact"><span className="eyebrow">Your everyday, a little more sacred.</span><h2>Light up <em>the vibe.</em></h2><p>Bring a little ritual into your everyday.</p><FinaleAwakening /><Button variant="ritual" asChild><a href="#collection" className="ritual-link">Find your Vedic <ArrowUpRight /></a></Button><footer className="footer-bottom"><div><Brand /><p>Light up the Vibe with Vedic</p></div><div className="footer-links"><Button variant="ritual" onClick={() => setContact(true)}>Contact <ArrowUpRight /></Button><Button variant="ritual" asChild><a href="#home" className="nav-link">Back to the light ↑</a></Button></div></footer></section>
    </main>
    <Dialog open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}><DialogContent className="detail-content">{mood && <div className="detail-layout"><div className="detail-product"><CandleArtwork mood={mood.name} /><p className="eyebrow text-center">Vedic / A collection of feelings</p></div><div><span className="eyebrow">The feeling of</span><DialogTitle className="detail-title">{mood.name}</DialogTitle><DialogDescription className="detail-description">{mood.story}</DialogDescription><dl className="detail-notes"><div><dt>Mood</dt><dd>{mood.mood}</dd></div><div><dt>Scent notes</dt><dd>To be revealed</dd></div><div><dt>Wax & burn time</dt><dd>Details coming soon</dd></div></dl><Button variant="ritual" className="ritual-link mt-7" onClick={() => { setSelected(null); document.getElementById('ritual')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }}>Enter the ritual <ArrowDown /></Button></div></div>}</DialogContent></Dialog>
    <Dialog open={contact} onOpenChange={setContact}><DialogContent className="detail-content contact-content"><span className="eyebrow">A little connection</span><DialogTitle className="detail-title">Hello, Vedic.</DialogTitle><DialogDescription className="detail-description">Our world is taking shape. Contact and social details will be here soon.</DialogDescription><Button variant="ritual" className="ritual-link" onClick={() => setContact(false)}>Return to the ritual <ArrowUpRight /></Button></DialogContent></Dialog>
  </div>;
}
