import { getHandler } from "@/app/webring/[id]"

export const revalidate = 300

export const GET = getHandler(0)

export { generateStaticParams } from "@/app/webring/[id]"
