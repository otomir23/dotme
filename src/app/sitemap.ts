import { MetadataRoute } from "next"
import { getBlogPosts } from "@/data"
import { env } from "@/env.mjs"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getBlogPosts()

    return [
        {
            url: `${env.CANONICAL_URL}/`,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${env.CANONICAL_URL}/webring/`,
            changeFrequency: "weekly",
            priority: 0.7,
        },
        ...posts.map(({ slug }) => ({
            url: `${env.CANONICAL_URL}/blog/${slug}`,
            changeFrequency: "monthly" as const,
            priority: 0.6,
        })),
    ]
}
