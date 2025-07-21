import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

export async function GET(context) {
    const posts = await getCollection('blog');

    return rss({
        title: 'Camilli.dev Blog',
        description: 'Musings on web dev, tech, books, and gaming',
        site: context.site,
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `/blog/${post.slug}/`,
        })),
        customData: `<language>en-us</language>`,
    });
}
