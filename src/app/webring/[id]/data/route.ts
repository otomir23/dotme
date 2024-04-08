import { getWebringSiteData } from "@/data/webring"

export const revalidate = 300

export async function GET(_: Request, { params: { id } }: { params: { id: string } }) {
    const data = await getWebringSiteData(+id)
    if (data === null) return new Response("Website is not part of my Webring", { status: 404 })
    return Response.json(data)
}

export { generateStaticParams } from "@/app/webring/[id]"
