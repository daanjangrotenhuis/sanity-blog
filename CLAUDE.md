# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server at localhost:4321
npm run build     # build for production (outputs to dist/)
npm run preview   # preview the production build locally
```

Sanity Studio is embedded at `/admin` and requires CORS origin `http://localhost:4321` to be added in the Sanity project dashboard for local development.

## Architecture

This is an **Astro blog** that uses **Sanity** as a headless CMS instead of local markdown files.

**Two content systems coexist in this repo:**
- `src/content/blog/` — the original Astro blog template's local markdown collection (defined in `src/content.config.ts`). Currently unused by the main pages.
- **Sanity** — the active content source. Posts are fetched at build/request time using `sanityClient` from the virtual module `sanity:client`.

**Sanity integration:**
- `astro.config.mjs` — configures `@sanity/astro` with project ID `7oxpyma4`, dataset `production`, and embeds Studio at `/admin`
- `sanity.config.ts` — Sanity Studio config, registers document schemas, uses `structureTool` from `sanity/structure`
- `src/schemas/post.ts` — the `post` document type (title, slug, publishedAt, body)

**Fetching data from Sanity in pages:**
```ts
import { sanityClient } from 'sanity:client';
const posts = await sanityClient.fetch(`*[_type == "post"]{ title, slug, body }`);
```
Queries use GROQ. Test queries in the Vision tool inside Sanity Studio (`/admin`).

**Key config values:**
- Sanity project ID: `7oxpyma4`
- Dataset: `production`
