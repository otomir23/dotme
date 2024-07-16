import { env } from "@/env.mjs"
import { z } from "zod"

const webringSiteSchema = z.object({
    id: z.number(),
    name: z.string(),
    url: z.string().url(),
})

const webringPointersSchema = z.object({
    prev: webringSiteSchema,
    curr: webringSiteSchema,
    next: webringSiteSchema,
})

export async function getWebringSiteData() {
    const base = env.WEBRING_API_BASE
    if (!base) return null

    const res = await fetch(`${base}/data`).catch(() => null)
    if (!res?.ok) return null

    const body = await res.json().catch(() => null)
    const data = webringPointersSchema.safeParse(body)
    if (!data.success) return null
    return data.data
}
