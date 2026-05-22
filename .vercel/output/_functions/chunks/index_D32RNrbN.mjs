import './page-ssr_BOvZtvWk.mjs';
import { c as createComponent } from './astro-component_Cq4_XSN_.mjs';
import 'piccolore';
import { c as renderTemplate, u as unescapeHTML, r as renderComponent, d as addAttribute, b as renderHead } from './entrypoint_CuZmYbwv.mjs';
import { r as renderScript, b as $$Footer, a as $$Header, $ as $$BaseHead } from './Header_DOgZ1Qz3.mjs';
import { S as SITE_TITLE } from './consts_CAKhepIX.mjs';
import { s as sanityClient } from './_sanity_client_CRB-gC0D.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const parks = await sanityClient.fetch(`
    *[_type == "park"] | order(featured desc, name asc) {
        name, slug, type, tagline, heroImageUrl, facilities,
        location, priceFrom, featured, discount
    }
`);
  const FACILITY_LABELS = {
    "zwembad": "🏊 Zwembad",
    "subtropisch-zwembad": "🌴 Subtropisch zwembad",
    "speeltuin": "🎡 Speeltuin",
    "hondenvriendelijk": "🐕 Honden welkom",
    "nabij-attractiepark": "🎢 Nabij attractiepark",
    "restaurant": "🍴 Restaurant",
    "animatie": "🎯 Animatie",
    "kinderanimatie": "🎭 Kinderanimatie",
    "wifi": "📶 Wifi",
    "sport-spel": "⚽ Sport & spel",
    "sauna-wellness": "🧖 Sauna & wellness",
    "fietsverhuur": "🚲 Fietsverhuur",
    "strand-meer": "🏖️ Strand/meer nabij",
    "klimpark": "🌲 Klimpark",
    "supermarkt": "🛒 Supermarkt nabij",
    "rolstoeltoegankelijk": "♿ Rolstoeltoegankelijk"
  };
  const usedFacilities = [...new Set(parks.flatMap((p) => p.facilities ?? []))];
  const parksForMap = parks.map((p) => ({
    slug: p.slug?.current,
    name: p.name,
    type: p.type,
    lat: p.location?.lat,
    lng: p.location?.lng,
    city: p.location?.city,
    province: p.location?.province,
    country: p.location?.country
  }));
  return renderTemplate(_a || (_a = __template(['<html lang="nl" data-astro-cid-o2abai5s> <head>', "", '</head> <body style="background: var(--cream);" data-astro-cid-o2abai5s> ', ` <!-- HERO --> <div style="background: var(--dark); padding: 4rem 1.5rem 5rem; position: relative; overflow: hidden;" data-astro-cid-o2abai5s> <div style="position: absolute; inset: 0; background: radial-gradient(ellipse at 60% 0%, rgba(0,180,166,0.15) 0%, transparent 60%);" data-astro-cid-o2abai5s></div> <div style="max-width: 1160px; margin: 0 auto; position: relative;" data-astro-cid-o2abai5s> <p style="font-family:'Nunito',sans-serif; font-size:0.68rem; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:var(--yellow); margin-bottom:0.75rem;" data-astro-cid-o2abai5s>Overnachten</p> <h1 style="font-family:'Fraunces',serif; font-size:clamp(2rem,5vw,3rem); font-weight:700; color:white; line-height:1.15; margin-bottom:1rem; font-optical-sizing:auto; max-width:640px;" data-astro-cid-o2abai5s>Ontdek parken &amp; accommodaties</h1> <p style="font-family:'Nunito',sans-serif; font-size:1.05rem; color:rgba(255,255,255,0.6); max-width:540px; line-height:1.75; margin:0;" data-astro-cid-o2abai5s>
Vind de perfecte verblijfplaats voor jouw gezin. Bekijk alle locaties op de kaart, filter op faciliteiten en klik door voor alle details.
</p> `, ` </div> <div style="position:absolute; bottom:-2px; left:0; right:0; line-height:0;" data-astro-cid-o2abai5s> <svg viewBox="0 0 1440 50" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="display:block; width:100%; height:50px;" data-astro-cid-o2abai5s> <path d="M0,20 C480,50 960,0 1440,30 L1440,50 L0,50 Z" fill="#F7FDFC" data-astro-cid-o2abai5s></path> </svg> </div> </div> <!-- FILTER + RESULTS --> <div style="max-width:1160px; margin:0 auto; padding:2.5rem 1.5rem 5rem;" data-astro-cid-o2abai5s> <!-- Search --> <div style="margin-bottom:1.5rem;" data-astro-cid-o2abai5s> <div style="position:relative; max-width:480px;" data-astro-cid-o2abai5s> <span style="position:absolute; left:1rem; top:50%; transform:translateY(-50%); color:var(--muted-light); font-size:1rem; pointer-events:none;" data-astro-cid-o2abai5s>🔍</span> <input id="park-search" type="search" placeholder="Zoek op naam, stad, provincie of land…" style="width:100%; font-family:'Nunito',sans-serif; font-size:0.9rem; padding:0.7rem 1rem 0.7rem 2.6rem; border:1.5px solid var(--border); border-radius:30px; background:white; color:var(--dark); outline:none; box-sizing:border-box;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'" data-astro-cid-o2abai5s> </div> </div> <!-- Filter chips --> `, ` <!-- Map --> <div style="border-radius:16px; overflow:hidden; border:1.5px solid var(--border); box-shadow:0 4px 24px rgba(13,40,48,0.08); margin-bottom:2.5rem;" data-astro-cid-o2abai5s> <div id="park-map" style="height:460px; width:100%;" data-astro-cid-o2abai5s></div> </div> <!-- Results count --> <div style="margin-bottom:1.25rem; display:flex; align-items:center; gap:0.75rem;" data-astro-cid-o2abai5s> <p id="results-count" style="font-family:'Nunito',sans-serif; font-size:0.875rem; color:var(--muted);" data-astro-cid-o2abai5s></p> <button id="clear-filters" style="display:none; font-family:'Nunito',sans-serif; font-size:0.82rem; font-weight:700; color:var(--primary); background:none; border:none; cursor:pointer; padding:0; text-decoration:underline;" data-astro-cid-o2abai5s>Wis filters</button> </div> <!-- Park cards --> `, " </div> ", ' <!-- Parks data for the map --> <script type="application/json" id="parks-map-data">', "<\/script> ", " </body> </html>"])), renderComponent($$result, "BaseHead", $$BaseHead, { "title": `Ontdek parken & accommodaties — ${SITE_TITLE}`, "description": "Bekijk alle vakantieparken, campings en accommodaties op de kaart. Filter op faciliteiten en vind de perfecte plek voor jouw gezin.", "data-astro-cid-o2abai5s": true }), renderHead(), renderComponent($$result, "Header", $$Header, { "data-astro-cid-o2abai5s": true }), parks.length > 0 && renderTemplate`<div style="margin-top:1.5rem; display:inline-flex; align-items:center; gap:0.6rem; background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.12); border-radius:30px; padding:0.5rem 1.1rem;" data-astro-cid-o2abai5s> <span style="font-family:'Nunito',sans-serif; font-size:0.875rem; font-weight:700; color:var(--primary);" data-astro-cid-o2abai5s>${parks.length}</span> <span style="font-family:'Nunito',sans-serif; font-size:0.875rem; color:rgba(255,255,255,0.55);" data-astro-cid-o2abai5s>locaties beschikbaar</span> </div>`, usedFacilities.length > 0 && renderTemplate`<div style="margin-bottom:2rem;" data-astro-cid-o2abai5s> <p style="font-family:'Nunito',sans-serif; font-size:0.72rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--muted-light); margin-bottom:0.75rem;" data-astro-cid-o2abai5s>Filter op faciliteit</p> <div id="filter-chips" style="display:flex; flex-wrap:wrap; gap:0.5rem;" data-astro-cid-o2abai5s> ${usedFacilities.map((f) => renderTemplate`<button${addAttribute(f, "data-facility")} class="filter-chip" style="font-family:'Nunito',sans-serif; font-size:0.82rem; font-weight:600; background:white; color:var(--muted); border:1.5px solid var(--border); border-radius:30px; padding:0.4rem 1rem; cursor:pointer; transition:all 0.15s; white-space:nowrap;" data-astro-cid-o2abai5s> ${FACILITY_LABELS[f] ?? f} </button>`)} </div> </div>`, parks.length === 0 ? renderTemplate`<div style="text-align:center; padding:5rem 1rem;" data-astro-cid-o2abai5s> <p style="font-family:'Fraunces',serif; font-size:1.5rem; color:var(--dark); font-optical-sizing:auto;" data-astro-cid-o2abai5s>Binnenkort hier te zien</p> <p style="font-family:'Nunito',sans-serif; font-size:0.95rem; color:var(--muted); margin-top:0.5rem;" data-astro-cid-o2abai5s>We voegen de eerste locaties snel toe.</p> </div>` : renderTemplate`<div id="parks-grid" style="display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem;" data-astro-cid-o2abai5s> ${parks.map((park, i) => renderTemplate`<a${addAttribute(`/overnachten/ontdekken/${park.slug?.current}`, "href")} class="park-card"${addAttribute(park.slug?.current, "data-slug")}${addAttribute(JSON.stringify(park.facilities ?? []), "data-facilities")}${addAttribute(park.location?.lat ?? "", "data-lat")}${addAttribute(park.location?.lng ?? "", "data-lng")} style="display:block; background:white; border:1.5px solid var(--border); border-radius:16px; overflow:hidden; text-decoration:none; box-shadow:0 2px 8px rgba(13,40,48,0.05); transition:transform 0.22s ease, box-shadow 0.22s ease;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 16px 40px rgba(13,40,48,0.12)'" onmouseout="this.style.transform=''; this.style.boxShadow='0 2px 8px rgba(13,40,48,0.05)'" data-astro-cid-o2abai5s> <!-- Image --> <div${addAttribute(`height:200px; background:var(--primary-light); position:relative; ${park.heroImageUrl ? `background-image:url('${park.heroImageUrl}'); background-size:cover; background-position:center;` : ""}`, "style")} data-astro-cid-o2abai5s> ${park.featured && renderTemplate`<span style="position:absolute; top:0.75rem; left:0.75rem; font-family:'Nunito',sans-serif; font-size:0.7rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; background:var(--orange); color:var(--dark); padding:0.3rem 0.7rem; border-radius:20px;" data-astro-cid-o2abai5s>⭐ Uitgelicht</span>`} ${park.type && renderTemplate`<span style="position:absolute; bottom:0.75rem; right:0.75rem; font-family:'Nunito',sans-serif; font-size:0.72rem; font-weight:700; background:rgba(13,40,48,0.75); color:white; padding:0.3rem 0.7rem; border-radius:20px; backdrop-filter:blur(4px);" data-astro-cid-o2abai5s> ${park.type.charAt(0).toUpperCase() + park.type.slice(1)} </span>`} </div> <!-- Content --> <div style="padding:1.25rem 1.4rem 1.5rem;" data-astro-cid-o2abai5s> ${park.location?.city && renderTemplate`<p style="font-family:'Nunito',sans-serif; font-size:0.72rem; color:var(--muted-light); margin-bottom:0.3rem;" data-astro-cid-o2abai5s>📍 ${park.location.city}${park.location.province ? `, ${park.location.province}` : ""}</p>`} <h3 style="font-family:'Fraunces',serif; font-size:1.1rem; font-weight:700; color:var(--dark); line-height:1.25; margin-bottom:0.4rem; font-optical-sizing:auto;" data-astro-cid-o2abai5s>${park.name}</h3> ${park.tagline && renderTemplate`<p style="font-family:'Nunito',sans-serif; font-size:0.875rem; color:var(--muted); line-height:1.55; margin-bottom:0.75rem;" data-astro-cid-o2abai5s>${park.tagline}</p>`} <!-- Facility chips --> ${park.facilities?.length > 0 && renderTemplate`<div style="display:flex; flex-wrap:wrap; gap:0.35rem; margin-bottom:0.85rem;" data-astro-cid-o2abai5s> ${park.facilities.slice(0, 4).map((f) => renderTemplate`<span style="font-family:'Nunito',sans-serif; font-size:0.72rem; font-weight:600; background:var(--primary-light); color:var(--primary-dark); padding:0.25rem 0.6rem; border-radius:20px;" data-astro-cid-o2abai5s> ${FACILITY_LABELS[f] ?? f} </span>`)} ${park.facilities.length > 4 && renderTemplate`<span style="font-family:'Nunito',sans-serif; font-size:0.72rem; color:var(--muted-light);" data-astro-cid-o2abai5s>+${park.facilities.length - 4} meer</span>`} </div>`} <div style="display:flex; align-items:center; justify-content:space-between;" data-astro-cid-o2abai5s> ${park.priceFrom ? renderTemplate`<p style="font-family:'Nunito',sans-serif; font-size:0.82rem; color:var(--muted);" data-astro-cid-o2abai5s>Vanaf <strong style="color:var(--dark);" data-astro-cid-o2abai5s>€${park.priceFrom}</strong>/nacht</p>` : renderTemplate`<span data-astro-cid-o2abai5s></span>`} <span style="font-family:'Nunito',sans-serif; font-size:0.82rem; font-weight:700; color:var(--primary);" data-astro-cid-o2abai5s>Bekijk →</span> </div> </div> </a>`)} </div>`, renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-o2abai5s": true }), unescapeHTML(JSON.stringify(parksForMap)), renderScript($$result, "/Users/daanjangrotenhuis/Sanity/src/pages/overnachten/ontdekken/index.astro?astro&type=script&index=0&lang.ts"));
}, "/Users/daanjangrotenhuis/Sanity/src/pages/overnachten/ontdekken/index.astro", void 0);

const $$file = "/Users/daanjangrotenhuis/Sanity/src/pages/overnachten/ontdekken/index.astro";
const $$url = "/overnachten/ontdekken";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
