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
- Serve the exact uploaded brand SVG from public/vedic-logo.svg for all logo placements and derive square favicon fallbacks from that same complete artwork; public assets work on external hosts without the Lovable asset proxy.
- Keep the Vedic brand experience in the index route with anchored chapters; it is one continuous scroll narrative rather than separate content pages.
- Reuse the exact original transparent product PNG through CandleArtwork as a bundled image import so external deployments do not depend on Lovable's host-relative asset proxy; preserve uploaded product pixels and never redraw the packaging.
- Select collection color artwork through the optional typed mood prop on CandleArtwork in both the collection and its dialogs; keep the original artwork as the default for every other scene. Recolored assets retain the original alpha, lid and label pixels to preserve packaging fidelity.
- Keep shared motion in CSS and the browser-side scene hook; isolate ritual and hero Awakening motion in separate candle wrappers using native CSS/animation-frame equivalents because Framer Motion is not installed. Each wrapper owns its section-scoped transforms with mobile and reduced-motion guards; no server or persistent storage is needed.
- Treat collection moods as editorial concepts until confirmed specifications arrive; never invent product claims or contact destinations.
- Isolate finale candle motion in its own native CSS/animation-frame wrapper using the shared CandleArtwork; keep decorative leaves behind the product and entrance, float, pointer and scroll transforms on separate layers to preserve the surrounding layout.
