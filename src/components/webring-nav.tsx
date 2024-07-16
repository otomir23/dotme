import Link from "next/link"
import { getWebringSiteData } from "@/data/webring"

export default async function WebringNav() {
    const data = await getWebringSiteData()
    if (!data) return null

    return (
        <nav
            className="sticky bottom-0 inset-x-0 dark:bg-neutral-950 bg-white text-xs py-4 px-6 sm:px-4 sm:py-2
            border-t border-neutral-100 dark:border-neutral-900 flex justify-between z-50"
        >
            <Link href={data.prev.url}>
                {`<-- ${data.prev.name}`}
            </Link>
            Webring
            <Link href={data.next.url}>
                {`${data.next.name} -->`}
            </Link>
        </nav>
    )
}
