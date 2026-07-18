# Elias Floreteng personal website

The personal website/portfolio of Elias Floreteng, built with [Astro](https://astro.build).

Live at [www.floreteng.se](https://www.floreteng.se), deployed on [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/) as static assets.

```sh
bun install
bun dev         # start dev server
bun run build   # build to dist/
bun run deploy  # build and deploy with wrangler
```

Redirects for legacy URLs live in `public/_redirects`.
