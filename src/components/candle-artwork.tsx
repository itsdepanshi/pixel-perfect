import candleOriginal from '@/assets/vedic-candle-transparent.png';
import calm from '@/assets/vedic-candle-calm.png';
import ground from '@/assets/vedic-candle-ground.png';
import glow from '@/assets/vedic-candle-glow.png';
import balance from '@/assets/vedic-candle-balance.png';

const collectionArtwork = {
  Calm: { src: calm, color: 'light olive' },
  Ground: { src: ground, color: 'sage' },
  Glow: { src: glow, color: 'muted terracotta' },
  Balance: { src: balance, color: 'dusty lavender' },
};
export type CandleMood = keyof typeof collectionArtwork;

export function CandleArtwork({ eager = false, mood }: { eager?: boolean; mood?: CandleMood }) {
  const artwork = mood ? collectionArtwork[mood] : undefined;
  return <div className="candle-art"><img src={artwork?.src ?? candleOriginal} alt={artwork ? `Vedic ${mood} ${artwork.color} candle with original wooden lid and botanical brand label` : 'Original Vedic olive candle with wooden lid and botanical brand label'} width={662} height={672} loading={eager ? 'eager' : 'lazy'} /></div>;
}