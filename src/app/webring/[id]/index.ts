import { getWebringSite } from "@/data/webring"

export function getHandler(offset: number) {
    return async function GET(_: Request, { params: { id } }: { params: { id: string } }) {
        const site = await getWebringSite(+id, offset)
        if (site === null) return new Response("Website is not part of my Webring", { status: 404 })
        return Response.redirect(site)
    }
}
