import { db } from "@/data/db"
import { unstable_cache } from "next/cache"
import { databaseRevalidationTag, databaseRevalidationTime } from "@/data/index"

export async function getWebringSite(id: number, offset: number) {
    const sites = await getWholeWebring()
    const i = sites.findIndex(s => s.id === id)
    if (i === -1) return null
    const site = sites.at((i + offset) % sites.length)
    if (!site) return null
    return site.url
}

export async function getWebringSiteData(id: number) {
    const sites = await getWholeWebring()
    const i = sites.findIndex(s => s.id === id)
    if (i === -1) return null
    return {
        prev: sites.at((i - 1) % sites.length)!,
        curr: sites.at(i % sites.length)!,
        next: sites.at((i + 1) % sites.length)!,
    }
}

export const getWholeWebring = unstable_cache(async () => {
    return db.query.webringSites.findMany({
        orderBy: (sites, { asc }) => asc(sites.id),
    })
}, ["webring"], {
    revalidate: databaseRevalidationTime,
    tags: [databaseRevalidationTag],
})
