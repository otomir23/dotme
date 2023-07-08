import db from "@/util/db";
import SimpleFM from '@solely/simple-fm';

export type Track = {

}

export async function getSocials() {
    return db.social.findMany();
}

export async function getStack() {
    return db.toolCategory.findMany({
        include: {
            tools: true
        }
    })
}

export async function getProjects({name, tool}: {name?: string, tool?: number} = {}) {
    return db.project.findMany({
        where: {
            ...(name && {
                name: {
                    contains: name
                }
            }),
            ...(tool && {
                tools: {
                    some: {
                        toolId: tool
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

export async function getBlogPosts() {
    return db.blogPost.findMany({
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