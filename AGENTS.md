<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- Keep the Vedic brand experience in the index route with anchored chapters; it is one continuous scroll narrative rather than separate content pages.
- Reuse the original product through a dedicated CandleArtwork component and a transparent asset pointer; background isolation preserves the uploaded product pixels and never redraws the packaging.
- Keep shared motion in CSS and the browser-side scene hook; isolate ritual and hero Awakening motion in separate candle wrappers using native CSS/animation-frame equivalents because Framer Motion is not installed. Each wrapper owns its section-scoped transforms with mobile and reduced-motion guards; no server or persistent storage is needed.
- Treat collection moods as editorial concepts until confirmed specifications arrive; never invent product claims or contact destinations.
- Isolate finale candle motion in its own native CSS/animation-frame wrapper; crop the uploaded vector's viewport to the candle without altering its paths, and keep entrance, float, pointer and scroll transforms on separate layers to preserve the surrounding layout.
