import { MetadataRoute } from 'next'
import {canonicalUrl} from "@/util/util";
import {getBlogPosts} from "@/util/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getBlogPosts()

    return [
        {
            url: `${canonicalUrl}/`,
            changeFrequency: 'weekly',
            priority: 1,
        },
        ...posts.map(({slug}) => ({
            url: `${canonicalUrl}/blog/${slug}`,
            changeFrequency: 'monthly' as const,
            priority: 0.6
        }))
    ]
}