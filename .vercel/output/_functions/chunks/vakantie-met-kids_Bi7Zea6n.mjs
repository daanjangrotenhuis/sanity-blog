import './page-ssr_BOvZtvWk.mjs';
import { c as createComponent } from './astro-component_Cq4_XSN_.mjs';
import 'piccolore';
import { r as renderComponent, b as renderHead, c as renderTemplate } from './entrypoint_CuZmYbwv.mjs';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from './Header_DOgZ1Qz3.mjs';
import { $ as $$PillarPageLayout } from './PillarPageLayout_5FF_Pjn2.mjs';
import { S as SITE_TITLE } from './consts_CAKhepIX.mjs';
import { s as sanityClient } from './_sanity_client_CRB-gC0D.mjs';

const $$VakantieMetKids = createComponent(async ($$result, $$props, $$slots) => {
  const [pillar, posts] = await Promise.all([
    sanityClient.fetch(`*[_type == "pillarPage" && slug.current == "vakantie-met-kids"][0]{ title, label, intro, heroImageUrl, contentHtml, metaDescription }`),
    sanityClient.fetch(`*[_type == "post" && 'vakantie-met-kids' in categories] | order(publishedAt desc) { title, slug, publishedAt, body, imageUrl }`)
  ]);
  const title = pillar?.title ?? "Vakantie met kids";
  const label = pillar?.label ?? "Vakantie voor Kids";
  const intro = pillar?.intro ?? "Alles over vakantie met kinderen. Van tips voor de reis tot de leukste bestemmingen in binnen- en buitenland.";
  const metaDescription = pillar?.metaDescription ?? intro;
  return renderTemplate`<html lang="nl"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": `${title} — ${SITE_TITLE}`, "description": metaDescription })}${renderHead()}</head> <body style="background: var(--cream);"> ${renderComponent($$result, "Header", $$Header, {})} ${renderComponent($$result, "PillarPageLayout", $$PillarPageLayout, { "title": title, "label": label, "intro": intro, "heroImageUrl": pillar?.heroImageUrl, "pillarContent": pillar?.contentHtml, "posts": posts })} ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/Users/daanjangrotenhuis/Sanity/src/pages/vakantie-met-kids.astro", void 0);

const $$file = "/Users/daanjangrotenhuis/Sanity/src/pages/vakantie-met-kids.astro";
const $$url = "/vakantie-met-kids";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$VakantieMetKids,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
