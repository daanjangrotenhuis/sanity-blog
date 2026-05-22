import './page-ssr_BOvZtvWk.mjs';
import { c as createComponent } from './astro-component_Cq4_XSN_.mjs';
import 'piccolore';
import { r as renderComponent, b as renderHead, c as renderTemplate } from './entrypoint_CuZmYbwv.mjs';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from './Header_DOgZ1Qz3.mjs';
import { $ as $$PillarPageLayout } from './PillarPageLayout_5FF_Pjn2.mjs';
import { S as SITE_TITLE } from './consts_CAKhepIX.mjs';
import { c as categoryGroups } from './categories_DXoevMFN.mjs';
import { s as sanityClient } from './_sanity_client_CRB-gC0D.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const group = categoryGroups.find((g) => g.slug === "bestemmingen");
  const allValues = group.subcategories.map((s) => s.sanityValue);
  const [pillar, posts] = await Promise.all([
    sanityClient.fetch(`*[_type == "pillarPage" && slug.current == "bestemmingen"][0]{ title, label, intro, heroImageUrl, contentHtml, metaDescription }`),
    sanityClient.fetch(`*[_type == "post" && count(categories[@ in $vals]) > 0] | order(publishedAt desc) { title, slug, publishedAt, body, imageUrl }`, { vals: allValues })
  ]);
  const title = pillar?.title ?? "Bestemmingen";
  const label = pillar?.label ?? "Vakantie voor Kids";
  const intro = pillar?.intro ?? "Waar wil je naartoe met de kids? Ontdek de leukste vakantiebestemmingen voor gezinnen.";
  const metaDescription = pillar?.metaDescription ?? intro;
  const subcategories = group.subcategories.map((sub) => ({
    slug: sub.slug,
    title: sub.title,
    description: sub.description,
    href: `/bestemmingen/${sub.slug}`
  }));
  return renderTemplate`<html lang="nl"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": `${title} — ${SITE_TITLE}`, "description": metaDescription })}${renderHead()}</head> <body style="background: var(--cream);"> ${renderComponent($$result, "Header", $$Header, {})} ${renderComponent($$result, "PillarPageLayout", $$PillarPageLayout, { "title": title, "label": label, "intro": intro, "heroImageUrl": pillar?.heroImageUrl, "pillarContent": pillar?.contentHtml, "subcategories": subcategories, "posts": posts })} ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/Users/daanjangrotenhuis/Sanity/src/pages/bestemmingen/index.astro", void 0);

const $$file = "/Users/daanjangrotenhuis/Sanity/src/pages/bestemmingen/index.astro";
const $$url = "/bestemmingen";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
