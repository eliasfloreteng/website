// Canonical-host redirect in front of the static assets.
const CANONICAL_HOST = "www.floreteng.se"

interface Env {
  ASSETS: { fetch: typeof fetch }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    if (url.hostname === "floreteng.se") {
      url.hostname = CANONICAL_HOST
      return Response.redirect(url.toString(), 301)
    }
    return env.ASSETS.fetch(request)
  },
}
