import { getWebringSiteData } from "@/data/webring"
import { corsHeaders } from "@/util"

export const revalidate = 300

export async function GET(_: Request, { params: { id } }: { params: { id: string } }) {
    const data = await getWebringSiteData(+id)
    if (data === null)
        return new Response("Website is not part of my Webring", { status: 404, headers: corsHeaders })
    return Response.json(data, { headers: corsHeaders })
}

export { generateStaticParams } from "@/app/webring/[id]"
