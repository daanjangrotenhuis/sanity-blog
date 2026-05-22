import './page-ssr_BOvZtvWk.mjs';
import { c as createComponent } from './astro-component_Cq4_XSN_.mjs';
import 'piccolore';
import { r as renderComponent, b as renderHead, c as renderTemplate } from './entrypoint_CuZmYbwv.mjs';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from './Header_DOgZ1Qz3.mjs';
import { $ as $$PillarPageLayout } from './PillarPageLayout_5FF_Pjn2.mjs';
import { S as SITE_TITLE } from './consts_CAKhepIX.mjs';
import { f as findSubcategory } from './categories_DXoevMFN.mjs';
import { s as sanityClient } from './_sanity_client_CRB-gC0D.mjs';

const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const category = findSubcategory("uitjes", slug);
  if (!category) return Astro2.redirect("/uitjes");
  const [pillar, posts] = await Promise.all([
    sanityClient.fetch(`*[_type == "pillarPage" && slug.current == $slug][0]{ title, label, intro, heroImageUrl, contentHtml, metaDescription }`, { slug }),
    sanityClient.fetch(`*[_type == "post" && $cat in categories] | order(publishedAt desc) { title, slug, publishedAt, body, imageUrl }`, { cat: category.sanityValue })
  ]);
  const title = pillar?.title ?? category.title;
  const label = pillar?.label ?? "Uitjes";
  const intro = pillar?.intro ?? category.intro;
  const metaDescription = pillar?.metaDescription ?? intro;
  return renderTemplate`<html lang="nl"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": `${title} — ${SITE_TITLE}`, "description": metaDescription })}${renderHead()}</head> <body style="background: var(--cream);"> ${renderComponent($$result, "Header", $$Header, {})} ${renderComponent($$result, "PillarPageLayout", $$PillarPageLayout, { "title": title, "label": label, "intro": intro, "heroImageUrl": pillar?.heroImageUrl, "pillarContent": pillar?.contentHtml, "posts": posts, "breadcrumb": { label: "Uitjes", href: "/uitjes" } })} ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/Users/daanjangrotenhuis/Sanity/src/pages/uitjes/[slug].astro", void 0);

const $$file = "/Users/daanjangrotenhuis/Sanity/src/pages/uitjes/[slug].astro";
const $$url = "/uitjes/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$slug,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
