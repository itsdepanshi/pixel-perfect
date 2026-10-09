import candleAsset from '@/assets/vedic-candle-transparent.png.asset.json';

export function CandleArtwork({ eager = false }: { eager?: boolean }) {
  return <div className="candle-art"><img src={candleAsset.url} alt="Original Vedic olive candle with wooden lid and botanical brand label" width={662} height={672} loading={eager ? 'eager' : 'lazy'} /></div>;
}