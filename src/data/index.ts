import { db } from "@/data/db"
import SimpleFM from "@solely/simple-fm"
import { env } from "@/env.mjs"
import { projectsToTools } from "@/data/db/schema"
import { unstable_cache } from "next/cache"

export const databaseRevalidationTag = "*"
export const databaseRevalidationTime = 43200 // 12 hours

export const getSocials = unstable_cache(async () => {
    return db.query.socials.findMany()
}, ["socials"], {
    revalidate: databaseRevalidationTime,
    tags: [databaseRevalidationTag],
})

export const getSocial = unstable_cache(async (name: string) => {
    return db.query.socials.findFirst({
        where: (socials, { sql, eq }) => eq(sql`lower(${socials.name})`, name.toLowerCase()),
    })
}, ["social"], {
    revalidate: databaseRevalidationTime,
    tags: [databaseRevalidationTag],
})

export const getStack = unstable_cache(async () => {
    return db.query.toolCategories.findMany({
        with: {
            tools: true,
        },
    })
}, ["stack"], {
    revalidate: databaseRevalidationTime,
    tags: [databaseRevalidationTag],
})

export const getProjects = unstable_cache(async (query: string | null = "", toolId: number | null = null) => {
    return db.query.projects.findMany({
        with: {
            tools: {
                with: {
                    tool: true,
                },
            },
        },
        orderBy: (projects, { desc }) => [desc(projects.releasedAt)],
        where: (projects, { ilike, inArray, and, or, eq }) => and(
            or(
                ilike(projects.name, `%${query ?? ""}%`),
                ilike(projects.description, `%${query ?? ""}%`),
            ),
            toolId !== null ? inArray(
                projects.id,
                db
                    .select({ id: projectsToTools.projectId })
                    .from(projectsToTools)
                    .where(eq(projectsToTools.toolId, toolId))
            ) : undefined,
        ),
    })
}, ["projects"], {
    revalidate: databaseRevalidationTime,
    tags: [databaseRevalidationTag],
})

export const getBlogPosts = unstable_cache(async (query: string | null = "") => {
    return db.query.blogPosts.findMany({
        orderBy: (blogPosts, { desc }) => [desc(blogPosts.postedAt)],
        where: (blogPosts, { and, ilike, or, eq }) => and(
            eq(blogPosts.unlisted, false),
            or(
                ilike(blogPosts.title, `%${query ?? ""}%`),
                ilike(blogPosts.content, `%${query ?? ""}%`),
                ilike(blogPosts.slug, `%${query ?? ""}%`),
            ),
        ),
    })
}, ["posts"], {
    revalidate: databaseRevalidationTime,
    tags: [databaseRevalidationTag],
})

export const getBlogPost = unstable_cache(async (slug: string) => {
    return db.query.blogPosts.findFirst({
        where: (blogPosts, { eq, sql }) => eq(sql`lower(${blogPosts.slug})`, slug.toLowerCase()),
    })
}, ["post"], {
    revalidate: databaseRevalidationTime,
    tags: [databaseRevalidationTag],
})

export async function getNowPlaying() {
    const lastFm = new SimpleFM(env.LASTFM_API_KEY)
    const data = await lastFm.user.getRecentTracks({
        username: env.LASTFM_USERNAME,
    })
    if (!data.search.nowPlaying) return null
    return data.tracks[0] || null
}
