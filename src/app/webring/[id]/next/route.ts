import { getHandler } from "@/app/webring/[id]"

export const revalidate = 60 * 5

export const GET = getHandler(1)
