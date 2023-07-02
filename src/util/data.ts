import db from "@/util/db";


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