import './page-ssr_BOvZtvWk.mjs';
import { c as createComponent } from './astro-component_Cq4_XSN_.mjs';
import 'piccolore';
import { r as renderComponent, b as renderHead, d as addAttribute, c as renderTemplate } from './entrypoint_CuZmYbwv.mjs';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from './Header_DOgZ1Qz3.mjs';
import { S as SITE_TITLE } from './consts_CAKhepIX.mjs';
import { s as sanityClient } from './_sanity_client_CRB-gC0D.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const posts = await sanityClient.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
        title, slug, publishedAt, body, imageUrl
    }
`);
  function formatDate(dateStr) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
  }
  function excerpt(body, length = 110) {
    if (!body) return "";
    const plain = body.replace(/<[^>]+>/g, "");
    return plain.length > length ? plain.slice(0, length).trimEnd() + "…" : plain;
  }
  return renderTemplate`<html lang="nl" data-astro-cid-5tznm7mj> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": `Blogs — ${SITE_TITLE}`, "description": "Alle reisverhalen en tips voor vakanties met kinderen.", "data-astro-cid-5tznm7mj": true })}${renderHead()}</head> <body style="background: var(--cream);" data-astro-cid-5tznm7mj> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-5tznm7mj": true })} <section style="background: var(--dark); padding: 3.5rem 2rem 3rem;" data-astro-cid-5tznm7mj> <div style="max-width: 1160px; margin: 0 auto;" data-astro-cid-5tznm7mj> <p style="font-family: 'Nunito', sans-serif; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--yellow); margin-bottom: 0.75rem;" data-astro-cid-5tznm7mj>Vakantie voor Kids</p> <h1 style="font-family: 'Fraunces', serif; font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 700; color: white; margin-bottom: 0.5rem; font-optical-sizing: auto;" data-astro-cid-5tznm7mj>
Alle blogs
</h1> <p style="font-family: 'Nunito', sans-serif; font-size: 0.95rem; color: rgba(255,255,255,0.45); margin: 0;" data-astro-cid-5tznm7mj> ${posts.length} blog${posts.length !== 1 ? "s" : ""} over vakanties met kinderen
</p> </div> </section> <main style="max-width: 1160px; margin: 0 auto; padding: 3.5rem 1.5rem 5rem;" data-astro-cid-5tznm7mj> ${posts.length > 0 ? renderTemplate`<div class="blog-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;" data-astro-cid-5tznm7mj> ${posts.map((post, i) => renderTemplate`<a${addAttribute(`/blog/${post.slug?.current}`, "href")} class="blog-card"${addAttribute(`display: block; background: var(--white); border: 1.5px solid var(--border); border-top: 3px solid ${i % 3 === 0 ? "var(--primary)" : i % 3 === 1 ? "var(--orange)" : "var(--yellow)"}; border-radius: 12px; overflow: hidden; text-decoration: none; box-shadow: 0 2px 8px rgba(13,40,48,0.05);`, "style")} data-astro-cid-5tznm7mj> <div${addAttribute(`height: 200px; background: var(--primary-light); ${post.imageUrl ? `background-image: url('${post.imageUrl}'); background-size: cover; background-position: center;` : ""}`, "style")} data-astro-cid-5tznm7mj></div> <div style="padding: 1.25rem 1.5rem 1.6rem;" data-astro-cid-5tznm7mj> <p style="font-family: 'Nunito', sans-serif; font-size: 0.75rem; color: var(--muted-light); margin-bottom: 0.5rem;" data-astro-cid-5tznm7mj>${formatDate(post.publishedAt)}</p> <h2 style="font-family: 'Fraunces', serif; font-size: 1.1rem; font-weight: 700; color: var(--dark); line-height: 1.35; margin-bottom: 0.6rem; font-optical-sizing: auto;" data-astro-cid-5tznm7mj> ${post.title} </h2> <p style="font-family: 'Nunito', sans-serif; font-size: 0.875rem; color: var(--muted); line-height: 1.65; margin: 0;" data-astro-cid-5tznm7mj> ${excerpt(post.body)} </p> </div> </a>`)} </div>` : renderTemplate`<p style="font-family: 'Nunito', sans-serif; color: var(--muted);" data-astro-cid-5tznm7mj>Binnenkort verschijnen hier de eerste blogs.</p>`} </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-5tznm7mj": true })} </body></html>`;
}, "/Users/daanjangrotenhuis/Sanity/src/pages/blog/index.astro", void 0);

const $$file = "/Users/daanjangrotenhuis/Sanity/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
