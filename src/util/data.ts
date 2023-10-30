import db from "@/util/db";
import SimpleFM from '@solely/simple-fm';

export async function getSocials() {
    return db.social.findMany();
}

export async function getSocial(name: string) {
    return db.social.findFirst({
        where: {
            name
        }
    });
}

export async function getStack() {
    return db.toolCategory.findMany({
        include: {
            tools: true
        }
    })
}

export async function getProjects(query: string | null = "", toolId: number | null = null) {
    return db.project.findMany({
        where: {
            ...(query && {
                OR: [
                    {
                        name: {
                            contains: query
                        }
                    },
                    {
                        tools: {
                            some: {
                                tool: {
                                    name: {
                                        contains: query
                                    }
                                }
                            }
                        }
                    }
                ]
            }),
            ...(toolId !== null && {
                tools: {
                    some: {
                        toolId: toolId
                    }
                }
            })
        },
        orderBy: [
            {
                releasedAt: 'desc'
            }
        ],
        include: {
            tools: {
                include: {
                    tool: true
                }
            }
        }
    });
}

export async function getBlogPosts(query: string | null = "") {
    return db.blogPost.findMany({
        where: {
            unlisted: {
                equals: false
            },
            ...(query && {
                OR: [
                    {
                        title: {
                            contains: query
                        }
                    },
                    {
                        content: {
                            contains: query
                        }
                    },
                    {
                        slug: {
                            contains: query
                        }
                    }
                ]
            }),
        },
        orderBy: [
            {
                postedAt: 'desc'
            }
        ]
    });
}

export async function getBlogPost(slug: string) {
    return db.blogPost.findFirst({
        where: {
            slug
        }
    });
}

export async function getNowPlaying() {
    const lastFm = new SimpleFM(process.env.LASTFM_API_KEY || "");
    const data = await lastFm.user.getRecentTracks({
        username: process.env.LASTFM_USERNAME || "",
    })
    if (!data.search.nowPlaying) return null
    return data.tracks[0] || null
}