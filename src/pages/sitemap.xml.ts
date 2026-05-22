import type { APIRoute } from 'astro';
import { sanityClient } from 'sanity:client';

const SITE = 'https://www.vakantievoorkids.nl';

const staticPages = [
    { url: `${SITE}/`, priority: '1.0', changefreq: 'daily' },
    { url: `${SITE}/blog`, priority: '0.9', changefreq: 'daily' },
    { url: `${SITE}/vakantie-met-kids`, priority: '0.85', changefreq: 'weekly' },
    { url: `${SITE}/bestemmingen`, priority: '0.85', changefreq: 'weekly' },
    { url: `${SITE}/bestemmingen/vakantie-nederland-met-kids`, priority: '0.8', changefreq: 'weekly' },
    { url: `${SITE}/bestemmingen/vakantie-belgie-met-kids`, priority: '0.8', changefreq: 'weekly' },
    { url: `${SITE}/bestemmingen/vakantie-duitsland-met-kids`, priority: '0.8', changefreq: 'weekly' },
    { url: `${SITE}/bestemmingen/vakantie-oostenrijk-met-kids`, priority: '0.8', changefreq: 'weekly' },
    { url: `${SITE}/overnachten`, priority: '0.85', changefreq: 'weekly' },
    { url: `${SITE}/overnachten/vakantiepark-voor-kids`, priority: '0.8', changefreq: 'weekly' },
    { url: `${SITE}/overnachten/midweek-weg-met-kids`, priority: '0.8', changefreq: 'weekly' },
    { url: `${SITE}/overnachten/weekend-weg-met-kids`, priority: '0.8', changefreq: 'weekly' },
    { url: `${SITE}/overnachten/campings-voor-kids`, priority: '0.8', changefreq: 'weekly' },
    { url: `${SITE}/uitjes`, priority: '0.85', changefreq: 'weekly' },
    { url: `${SITE}/uitjes/kindvriendelijke-restaurants`, priority: '0.8', changefreq: 'weekly' },
    { url: `${SITE}/uitjes/kindvriendelijk-musea`, priority: '0.8', changefreq: 'weekly' },
    { url: `${SITE}/uitjes/binnenspeeltijd`, priority: '0.8', changefreq: 'weekly' },
    { url: `${SITE}/uitjes/zwemparadijs`, priority: '0.8', changefreq: 'weekly' },
    { url: `${SITE}/overnachten/ontdekken`, priority: '0.85', changefreq: 'weekly' },
    { url: `${SITE}/about`, priority: '0.6', changefreq: 'monthly' },
];

export const GET: APIRoute = async () => {
    const [posts, parks] = await Promise.all([
        sanityClient.fetch<{ slug: { current: string }; publishedAt: string }[]>(`
            *[_type == "post"] | order(publishedAt desc) { slug, publishedAt }
        `),
        sanityClient.fetch<{ slug: { current: string }; _updatedAt: string }[]>(`
            *[_type == "park"] | order(name asc) { slug, _updatedAt }
        `),
    ]);

    const postEntries = posts.map(post => ({
        url: `${SITE}/blog/${post.slug.current}`,
        lastmod: post.publishedAt ? post.publishedAt.slice(0, 10) : undefined,
        priority: '0.8',
        changefreq: 'weekly',
    }));

    const parkEntries = parks.map(park => ({
        url: `${SITE}/overnachten/ontdekken/${park.slug.current}`,
        lastmod: park._updatedAt ? park._updatedAt.slice(0, 10) : undefined,
        priority: '0.75',
        changefreq: 'weekly',
    }));

    const allEntries = [...staticPages, ...postEntries, ...parkEntries];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries.map(entry => `  <url>
    <loc>${entry.url}</loc>${entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    });
};
