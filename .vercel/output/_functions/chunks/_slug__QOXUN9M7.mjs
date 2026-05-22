import './page-ssr_BOvZtvWk.mjs';
import { c as createComponent } from './astro-component_Cq4_XSN_.mjs';
import 'piccolore';
import { r as renderComponent, b as renderHead, d as addAttribute, c as renderTemplate, u as unescapeHTML } from './entrypoint_CuZmYbwv.mjs';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from './Header_DOgZ1Qz3.mjs';
import { S as SITE_TITLE } from './consts_CAKhepIX.mjs';
import { s as sanityClient } from './_sanity_client_CRB-gC0D.mjs';

const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const [park, relatedPosts] = await Promise.all([
    sanityClient.fetch(`
        *[_type == "park" && slug.current == $slug][0]{
            name, slug, type, tagline, description, heroImageUrl, imageUrls,
            videoUrl, facilities, omgeving, location, openingPeriod, priceFrom,
            website, bookingUrl, discount, featured
        }
    `, { slug }),
    sanityClient.fetch(`
        *[_type == "post" && $slug in categories] | order(publishedAt desc)[0...6]{
            title, slug, publishedAt, body, imageUrl
        }
    `, { slug })
  ]);
  if (!park) {
    return Astro2.redirect("/overnachten/ontdekken");
  }
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
  const OMGEVING_LABELS = {
    "bos": "🌲 Bos",
    "strand": "🏖️ Strand",
    "zee": "🌊 Zee",
    "meer": "💧 Meer / rivier",
    "bergen": "🏔️ Bergen / heuvelland",
    "natuur": "🌿 Natuur / heide",
    "duinen": "🏜️ Duinen",
    "nabij-attractiepark": "🎢 Nabij attractiepark",
    "stad": "🏙️ Stad nabij",
    "ns-station": "🚂 NS-station nabij",
    "snelweg": "🛣️ Snelweg nabij"
  };
  const TYPE_LABELS = {
    "vakantiepark": "Vakantiepark",
    "camping": "Camping",
    "glamping": "Glamping",
    "hotel": "Hotel",
    "bungalowpark": "Bungalowpark",
    "boerderijcamping": "Boerderijcamping"
  };
  function youtubeEmbed(url) {
    const match = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  }
  function formatDate(dateStr) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
  }
  function excerpt(body, length = 115) {
    if (!body) return "";
    const plain = body.replace(/<[^>]+>/g, "");
    return plain.length > length ? plain.slice(0, length).trimEnd() + "…" : plain;
  }
  const embedUrl = park.videoUrl ? youtubeEmbed(park.videoUrl) : null;
  const allImages = [park.heroImageUrl, ...park.imageUrls ?? []].filter(Boolean);
  const metaDescription = park.tagline ?? `Alles over ${park.name} — faciliteiten, foto's, locatie en meer.`;
  return renderTemplate`<html lang="nl" data-astro-cid-zsghy6zt> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": `${park.name} — ${SITE_TITLE}`, "description": metaDescription, "data-astro-cid-zsghy6zt": true })}${renderHead()}</head> <body style="background: var(--cream);" data-astro-cid-zsghy6zt> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-zsghy6zt": true })} <!-- HERO --> <div${addAttribute(`position:relative; min-height:480px; display:flex; flex-direction:column; justify-content:flex-end; overflow:hidden; background:var(--dark);`, "style")} data-astro-cid-zsghy6zt> ${park.heroImageUrl && renderTemplate`<div${addAttribute(`position:absolute; inset:0; background-image:url('${park.heroImageUrl}'); background-size:cover; background-position:center;`, "style")} data-astro-cid-zsghy6zt></div>`} <div style="position:absolute; inset:0; background:linear-gradient(170deg, rgba(13,40,48,0.35) 0%, rgba(13,40,48,0.8) 100%);" data-astro-cid-zsghy6zt></div> <div style="position:relative; z-index:2; max-width:1160px; margin:0 auto; padding:2rem 2rem 4rem; width:100%;" data-astro-cid-zsghy6zt> <p style="font-family:'Nunito',sans-serif; font-size:0.72rem; color:rgba(255,255,255,0.4); margin-bottom:0.6rem;" data-astro-cid-zsghy6zt> <a href="/overnachten" style="color:rgba(255,255,255,0.4); text-decoration:none;" data-astro-cid-zsghy6zt>Overnachten</a> ${" / "} <a href="/overnachten/ontdekken" style="color:rgba(255,255,255,0.4); text-decoration:none;" data-astro-cid-zsghy6zt>Ontdekken</a> ${" / "} <span style="color:rgba(255,255,255,0.6);" data-astro-cid-zsghy6zt>${park.name}</span> </p> ${park.type && renderTemplate`<span style="font-family:'Nunito',sans-serif; font-size:0.68rem; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; background:var(--primary); color:white; padding:0.3rem 0.8rem; border-radius:20px; display:inline-block; margin-bottom:0.85rem;" data-astro-cid-zsghy6zt> ${TYPE_LABELS[park.type] ?? park.type} </span>`} ${park.featured && renderTemplate`<span style="font-family:'Nunito',sans-serif; font-size:0.68rem; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; background:var(--orange); color:var(--dark); padding:0.3rem 0.8rem; border-radius:20px; display:inline-block; margin-bottom:0.85rem; margin-left:0.5rem;" data-astro-cid-zsghy6zt>
⭐ Uitgelicht
</span>`} <h1 style="font-family:'Fraunces',serif; font-size:clamp(2rem,5vw,3.2rem); font-weight:700; color:white; line-height:1.1; margin-bottom:0.75rem; font-optical-sizing:auto;" data-astro-cid-zsghy6zt>${park.name}</h1> ${park.tagline && renderTemplate`<p style="font-family:'Nunito',sans-serif; font-size:1.05rem; color:rgba(255,255,255,0.7); max-width:560px; line-height:1.7; margin:0;" data-astro-cid-zsghy6zt>${park.tagline}</p>`} ${park.location?.city && renderTemplate`<p style="font-family:'Nunito',sans-serif; font-size:0.875rem; color:rgba(255,255,255,0.5); margin-top:0.75rem;" data-astro-cid-zsghy6zt>
📍 ${park.location.city}${park.location.province ? `, ${park.location.province}` : ""}${park.location.country && park.location.country !== "Nederland" ? ` · ${park.location.country}` : ""} </p>`} </div> <div style="position:absolute; bottom:-2px; left:0; right:0; z-index:3; line-height:0;" data-astro-cid-zsghy6zt> <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="display:block; width:100%; height:60px;" data-astro-cid-zsghy6zt> <path d="M0,0 C360,55 720,5 1080,45 C1260,60 1380,15 1440,0 L1440,60 L0,60 Z" fill="#ffffff" data-astro-cid-zsghy6zt></path> </svg> </div> </div> <!-- GALLERY STRIP --> ${allImages.length > 1 && renderTemplate`<div style="background:white; border-bottom:1px solid var(--border);" data-astro-cid-zsghy6zt> <div style="max-width:1160px; margin:0 auto; padding:1.5rem 1.5rem;" data-astro-cid-zsghy6zt> <div style="display:flex; gap:0.75rem; overflow-x:auto; padding-bottom:0.5rem; scrollbar-width:thin;" data-astro-cid-zsghy6zt> ${allImages.map((url, i) => renderTemplate`<div${addAttribute(`flex-shrink:0; width:${i === 0 ? "380px" : "240px"}; height:200px; border-radius:12px; overflow:hidden; cursor:pointer; background:var(--primary-light);`, "style")}${addAttribute(`document.getElementById('lightbox').style.display='flex'; document.getElementById('lightbox-img').src='${url}';`, "onclick")} data-astro-cid-zsghy6zt> <img${addAttribute(url, "src")}${addAttribute(`${park.name} foto ${i + 1}`, "alt")} style="width:100%; height:100%; object-fit:cover; display:block;" loading="lazy" data-astro-cid-zsghy6zt> </div>`)} </div> </div> </div>`} <!-- LIGHTBOX --> <div id="lightbox" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.92); z-index:1000; align-items:center; justify-content:center;" onclick="this.style.display='none'" data-astro-cid-zsghy6zt> <img id="lightbox-img" src="" alt="" style="max-width:90vw; max-height:90vh; object-fit:contain; border-radius:8px;" data-astro-cid-zsghy6zt> </div> <!-- MAIN CONTENT --> <div style="background:white; border-bottom:1px solid var(--border);" data-astro-cid-zsghy6zt> <div style="max-width:1160px; margin:0 auto; padding:4rem 1.5rem 5rem; display:grid; grid-template-columns:1fr 320px; gap:4rem; align-items:start;" class="park-content-grid" data-astro-cid-zsghy6zt> <!-- Left: description + video --> <div data-astro-cid-zsghy6zt> ${park.description ? renderTemplate`<article class="park-body" data-astro-cid-zsghy6zt>${unescapeHTML(park.description)}</article>` : renderTemplate`<p style="font-family:'Nunito',sans-serif; font-size:1rem; color:var(--muted); font-style:italic;" data-astro-cid-zsghy6zt>Beschrijving volgt binnenkort.</p>`} ${embedUrl && renderTemplate`<div style="margin-top:3rem;" data-astro-cid-zsghy6zt> <h2 style="font-family:'Fraunces',serif; font-size:1.5rem; font-weight:700; color:var(--dark); margin-bottom:1.25rem; font-optical-sizing:auto;" data-astro-cid-zsghy6zt>Video</h2> <div style="position:relative; padding-bottom:56.25%; height:0; border-radius:14px; overflow:hidden; background:var(--dark);" data-astro-cid-zsghy6zt> <iframe${addAttribute(embedUrl, "src")}${addAttribute(`Video van ${park.name}`, "title")} style="position:absolute; inset:0; width:100%; height:100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen data-astro-cid-zsghy6zt></iframe> </div> </div>`} </div> <!-- Right: info sidebar --> <aside style="position:sticky; top:2rem; display:flex; flex-direction:column; gap:1.25rem;" data-astro-cid-zsghy6zt> <!-- Discount highlight --> ${park.discount && renderTemplate`<div style="background:var(--orange); border-radius:14px; padding:1.25rem 1.4rem;" data-astro-cid-zsghy6zt> <p style="font-family:'Nunito',sans-serif; font-size:0.68rem; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:rgba(13,40,48,0.6); margin-bottom:0.4rem;" data-astro-cid-zsghy6zt>🎁 Speciale aanbieding</p> <p style="font-family:'Nunito',sans-serif; font-size:0.9rem; font-weight:700; color:var(--dark); line-height:1.5; margin:0;" data-astro-cid-zsghy6zt>${park.discount}</p> </div>`} <!-- Info card --> <div style="background:var(--cream); border:1.5px solid var(--border); border-radius:14px; padding:1.5rem;" data-astro-cid-zsghy6zt> ${park.priceFrom && renderTemplate`<div style="margin-bottom:1.25rem; padding-bottom:1.25rem; border-bottom:1px solid var(--border);" data-astro-cid-zsghy6zt> <p style="font-family:'Nunito',sans-serif; font-size:0.72rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--muted-light); margin-bottom:0.3rem;" data-astro-cid-zsghy6zt>Prijs</p> <p style="font-family:'Fraunces',serif; font-size:1.5rem; font-weight:700; color:var(--dark); font-optical-sizing:auto; margin:0;" data-astro-cid-zsghy6zt>
€${park.priceFrom} <span style="font-size:0.875rem; font-family:'Nunito',sans-serif; font-weight:400; color:var(--muted);" data-astro-cid-zsghy6zt>/ nacht</span> </p> </div>`} ${park.openingPeriod && renderTemplate`<div style="margin-bottom:1rem;" data-astro-cid-zsghy6zt> <p style="font-family:'Nunito',sans-serif; font-size:0.72rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--muted-light); margin-bottom:0.3rem;" data-astro-cid-zsghy6zt>Open</p> <p style="font-family:'Nunito',sans-serif; font-size:0.9rem; font-weight:600; color:var(--dark); margin:0;" data-astro-cid-zsghy6zt>🗓️ ${park.openingPeriod}</p> </div>`} ${park.location?.address && renderTemplate`<div style="margin-bottom:1rem;" data-astro-cid-zsghy6zt> <p style="font-family:'Nunito',sans-serif; font-size:0.72rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--muted-light); margin-bottom:0.3rem;" data-astro-cid-zsghy6zt>Adres</p> <p style="font-family:'Nunito',sans-serif; font-size:0.875rem; color:var(--muted); margin:0;" data-astro-cid-zsghy6zt>${park.location.address}</p> </div>`} ${park.bookingUrl && renderTemplate`<a${addAttribute(park.bookingUrl, "href")} target="_blank" rel="noopener" style="display:block; font-family:'Nunito',sans-serif; font-size:0.9rem; font-weight:700; background:var(--primary); color:white; padding:0.8rem 1rem; border-radius:10px; text-decoration:none; text-align:center; margin-bottom:0.6rem;" data-astro-cid-zsghy6zt>
Boek nu →
</a>`} ${park.website && renderTemplate`<a${addAttribute(park.website, "href")} target="_blank" rel="noopener" style="display:block; font-family:'Nunito',sans-serif; font-size:0.875rem; font-weight:600; background:white; color:var(--dark); border:1.5px solid var(--border); padding:0.7rem 1rem; border-radius:10px; text-decoration:none; text-align:center;" data-astro-cid-zsghy6zt>
Bezoek website
</a>`} </div> <!-- Facilities --> ${park.facilities?.length > 0 && renderTemplate`<div style="background:var(--primary-light); border:1.5px solid #A8E8E2; border-radius:14px; padding:1.5rem;" data-astro-cid-zsghy6zt> <p style="font-family:'Nunito',sans-serif; font-size:0.68rem; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:var(--primary-dark); margin-bottom:1rem;" data-astro-cid-zsghy6zt>Faciliteiten</p> <div style="display:flex; flex-direction:column; gap:0.4rem;" data-astro-cid-zsghy6zt> ${park.facilities.map((f) => renderTemplate`<span style="font-family:'Nunito',sans-serif; font-size:0.875rem; color:var(--primary-dark);" data-astro-cid-zsghy6zt> ${FACILITY_LABELS[f] ?? f} </span>`)} </div> </div>`} <!-- Omgeving --> ${park.omgeving?.length > 0 && renderTemplate`<div style="background:var(--cream); border:1.5px solid var(--border); border-radius:14px; padding:1.5rem;" data-astro-cid-zsghy6zt> <p style="font-family:'Nunito',sans-serif; font-size:0.68rem; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:var(--muted-light); margin-bottom:1rem;" data-astro-cid-zsghy6zt>Omgeving</p> <div style="display:flex; flex-direction:column; gap:0.4rem;" data-astro-cid-zsghy6zt> ${park.omgeving.map((o) => renderTemplate`<span style="font-family:'Nunito',sans-serif; font-size:0.875rem; color:var(--muted);" data-astro-cid-zsghy6zt> ${OMGEVING_LABELS[o] ?? o} </span>`)} </div> </div>`} </aside> </div> </div> <!-- RELATED BLOGS --> ${relatedPosts.length > 0 && renderTemplate`<section style="background:var(--cream); border-bottom:1px solid var(--border); padding:4.5rem 1.5rem 5rem;" data-astro-cid-zsghy6zt> <div style="max-width:1160px; margin:0 auto;" data-astro-cid-zsghy6zt> <div style="margin-bottom:2rem;" data-astro-cid-zsghy6zt> <p style="font-family:'Nunito',sans-serif; font-size:0.68rem; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:var(--primary); margin-bottom:0.5rem;" data-astro-cid-zsghy6zt>Blogs</p> <h2 style="font-family:'Fraunces',serif; font-size:clamp(1.5rem,3vw,2rem); font-weight:700; color:var(--dark); font-optical-sizing:auto; margin:0;" data-astro-cid-zsghy6zt>Blogs over ${park.name}</h2> </div> <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem;" class="blog-grid" data-astro-cid-zsghy6zt> ${relatedPosts.map((post, i) => renderTemplate`<a${addAttribute(`/blog/${post.slug?.current}`, "href")}${addAttribute(`display:block; background:white; border:1.5px solid var(--border); border-top:3px solid ${i % 3 === 0 ? "var(--primary)" : i % 3 === 1 ? "var(--orange)" : "var(--yellow)"}; border-radius:14px; overflow:hidden; text-decoration:none; box-shadow:0 2px 8px rgba(13,40,48,0.05); transition:transform 0.22s ease, box-shadow 0.22s ease;`, "style")} onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 16px 40px rgba(13,40,48,0.12)'" onmouseout="this.style.transform=''; this.style.boxShadow='0 2px 8px rgba(13,40,48,0.05)'" data-astro-cid-zsghy6zt> <div${addAttribute(`height:180px; background:var(--primary-light); ${post.imageUrl ? `background-image:url('${post.imageUrl}'); background-size:cover; background-position:center;` : ""}`, "style")} data-astro-cid-zsghy6zt></div> <div style="padding:1.2rem 1.4rem 1.5rem;" data-astro-cid-zsghy6zt> <p style="font-family:'Nunito',sans-serif; font-size:0.72rem; color:var(--muted-light); margin-bottom:0.35rem;" data-astro-cid-zsghy6zt>${formatDate(post.publishedAt)}</p> <h3 style="font-family:'Fraunces',serif; font-size:1rem; font-weight:700; color:var(--dark); line-height:1.3; margin-bottom:0.4rem; font-optical-sizing:auto;" data-astro-cid-zsghy6zt>${post.title}</h3> <p style="font-family:'Nunito',sans-serif; font-size:0.875rem; color:var(--muted); line-height:1.6; margin:0;" data-astro-cid-zsghy6zt>${excerpt(post.body)}</p> </div> </a>`)} </div> </div> </section>`} ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-zsghy6zt": true })} </body> </html>`;
}, "/Users/daanjangrotenhuis/Sanity/src/pages/overnachten/ontdekken/[slug].astro", void 0);

const $$file = "/Users/daanjangrotenhuis/Sanity/src/pages/overnachten/ontdekken/[slug].astro";
const $$url = "/overnachten/ontdekken/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$slug,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
