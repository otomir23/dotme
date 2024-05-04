import { revalidateTag } from "next/cache"
import { databaseRevalidationTag } from "@/data"
import { NextRequest } from "next/server"
import { env } from "@/env.mjs"

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams
    const key = params.get("key")
    if (!key || !env.INVALIDATION_KEY || key !== env.INVALIDATION_KEY)
        return new Response("Invalid key.", { status: 403 })
    revalidateTag(databaseRevalidationTag)
    return new Response("Cache invalidated!")
}
