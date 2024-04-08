import { db } from "@/data/db"

export async function getWebringSite(id: number, offset: number) {
    const sites = await getWholeWebring()
    const i = sites.findIndex(s => s.id === id)
    const site = sites.at((i + offset) % sites.length)
    if (!site) return null
    return site.url
}

export async function getWholeWebring() {
    return db.query.webringSites.findMany({
        orderBy: (sites, { asc }) => asc(sites.id),
    })
}
