import { db } from "@/util/db"
import SimpleFM from "@solely/simple-fm"
import { env } from "@/env.mjs"
import { projectsToTools } from "@/util/schema"

export async function getSocials() {
    return db.query.socials.findMany()
}

export async function getSocial(name: string) {
    return db.query.socials.findFirst({
        where: (socials, { sql, eq }) => eq(sql`lower(${socials.name})`, name.toLowerCase()),
    })
}

export async function getStack() {
    return db.query.toolCategories.findMany({
        with: {
            tools: true,
        },
    })
}

export async function getProjects(query: string | null = "", toolId: number | null = null) {
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
}

export async function getBlogPosts(query: string | null = "") {
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
    /* return db.blogPost.findMany({
        where: {
            unlisted: {
                equals: false,
            },
            ...(query && {
                OR: [
                    {
                        title: {
                            contains: query,
                        },
                    },
                    {
                        content: {
                            contains: query,
                        },
                    },
                    {
                        slug: {
                            contains: query,
                        },
                    },
                ],
            }),
        },
        orderBy: [
            {
                postedAt: "desc",
            },
        ],
    }) */
}

export async function getBlogPost(slug: string) {
    return db.query.blogPosts.findFirst({
        where: (blogPosts, { eq, sql }) => eq(sql`lower(${blogPosts.slug})`, slug.toLowerCase()),
    })
}

export async function getNowPlaying() {
    const lastFm = new SimpleFM(env.LASTFM_API_KEY)
    const data = await lastFm.user.getRecentTracks({
        username: env.LASTFM_USERNAME,
    })
    if (!data.search.nowPlaying) return null
    return data.tracks[0] || null
}
