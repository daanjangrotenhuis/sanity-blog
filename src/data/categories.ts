export interface Subcategory {
    slug: string;
    title: string;
    description: string;
    intro: string;
    sanityValue: string;
}

export interface CategoryGroup {
    slug: string;
    title: string;
    description: string;
    subcategories: Subcategory[];
}

export const categoryGroups: CategoryGroup[] = [
    {
        slug: 'bestemmingen',
        title: 'Bestemmingen',
        description: 'Waar wil je naartoe met de kids?',
        subcategories: [
            {
                slug: 'vakantie-nederland-met-kids',
                title: 'Vakantie Nederland met kids',
                description: 'De mooiste plekken in eigen land',
                intro: 'Nederland heeft meer te bieden dan je denkt. Van de Waddeneilanden tot de Veluwe en van de Zeeuwse kust tot de Limburgse heuvels — er is voor elk gezin een perfecte bestemming dichtbij huis.',
                sanityValue: 'vakantie-nederland-met-kids',
            },
            {
                slug: 'vakantie-belgie-met-kids',
                title: 'Vakantie België met kids',
                description: 'Net over de grens, veel te beleven',
                intro: 'België is een ideale bestemming voor een korte gezinsvakantie. Zee, Ardenen of een citytrip naar Brussel — het is snel te rijden en er is voor iedereen wat te doen.',
                sanityValue: 'vakantie-belgie-met-kids',
            },
            {
                slug: 'vakantie-duitsland-met-kids',
                title: 'Vakantie Duitsland met kids',
                description: 'Avontuur vlak over de grens',
                intro: 'Duitsland biedt eindeloos veel mogelijkheden voor gezinnen: dierentuinen, pretparken, meren en bossen. En het is nog snel te rijden ook.',
                sanityValue: 'vakantie-duitsland-met-kids',
            },
            {
                slug: 'vakantie-oostenrijk-met-kids',
                title: 'Vakantie Oostenrijk met kids',
                description: 'Bergen, meren en avontuur',
                intro: 'Oostenrijk is een prachtige bestemming voor gezinnen. Van de Alpen tot de Donau en van Wenen tot de Tyroolse dorpjes — er is voor elk gezin wat te beleven.',
                sanityValue: 'vakantie-oostenrijk-met-kids',
            },
        ],
    },
    {
        slug: 'overnachten',
        title: 'Overnachten',
        description: 'Waar slaap je met de kids?',
        subcategories: [
            {
                slug: 'vakantiepark-voor-kids',
                title: 'Vakantiepark voor kids',
                description: 'Alles op één plek',
                intro: 'Een vakantiepark is de ideale keuze voor gezinnen met kinderen. Animatie, zwembaden, speeltuinen — de kids zijn de hele dag bezig en jij kunt eindelijk ontspannen.',
                sanityValue: 'vakantiepark-voor-kids',
            },
            {
                slug: 'midweek-weg-met-kids',
                title: 'Midweek weg met kids',
                description: 'Een paar dagen er tussenuit',
                intro: 'Een midweekje weg met de kinderen is de perfecte mini-vakantie. Minder druk dan in het weekend, meer ontspanning voor het hele gezin. Ontdek de beste midweekbestemmingen voor gezinnen.',
                sanityValue: 'midweek-weg-met-kids',
            },
            {
                slug: 'weekend-weg-met-kids',
                title: 'Weekend weg met kids',
                description: 'Een weekendje weg met het gezin',
                intro: 'Een weekend weg is de perfecte manier om even te ontsnappen aan de dagelijkse routine. Ontdek de leukste weekendbestemmingen voor gezinnen.',
                sanityValue: 'weekend-weg-met-kids',
            },
            {
                slug: 'campings-voor-kids',
                title: 'Campings voor kids',
                description: 'Slapen onder de sterren',
                intro: 'Kamperen met kinderen is een unieke ervaring. Ontdek de mooiste kindvriendelijke campings in Nederland en Europa.',
                sanityValue: 'campings-voor-kids',
            },
        ],
    },
    {
        slug: 'uitjes',
        title: 'Uitjes',
        description: 'Leuke activiteiten met de kids',
        subcategories: [
            {
                slug: 'kindvriendelijke-restaurants',
                title: 'Kindvriendelijke restaurants',
                description: 'Lekker eten met de hele familie',
                intro: 'Uiteten met kinderen hoeft geen stress te zijn. Ontdek kindvriendelijke restaurants waar de kids zich thuis voelen én de ouders kunnen genieten van goed eten.',
                sanityValue: 'kindvriendelijke-restaurants',
            },
            {
                slug: 'kindvriendelijk-musea',
                title: 'Kindvriendelijk musea',
                description: 'Leren én ontdekken',
                intro: 'Musea kunnen enorm leuk zijn voor kinderen — als je de juiste kiest. Ontdek musea die speciaal op kinderen zijn afgestemd en waar beleving centraal staat.',
                sanityValue: 'kindvriendelijk-musea',
            },
            {
                slug: 'binnenspeeltijd',
                title: 'Binnenspeeltijd',
                description: 'Lekker ravotten binnen',
                intro: 'Regenweer of gewoon zin in een binnenspeeltuin? Ontdek de leukste binnenspeeltuinen, klimhallen en speelparadijzen voor kinderen.',
                sanityValue: 'binnenspeeltijd',
            },
            {
                slug: 'zwemparadijs',
                title: 'Zwemparadijs',
                description: 'Plonzen en glijbanen',
                intro: 'Een dag in het zwemparadijs — kinderen vinden het geweldig. Ontdek de leukste subtropische zwembaden en waterparken in Nederland en omgeving.',
                sanityValue: 'zwemparadijs',
            },
        ],
    },
];

export function findGroup(slug: string): CategoryGroup | null {
    return categoryGroups.find(g => g.slug === slug) ?? null;
}

export function findSubcategory(groupSlug: string, subSlug: string): Subcategory | null {
    const group = findGroup(groupSlug);
    return group?.subcategories.find(s => s.slug === subSlug) ?? null;
}
