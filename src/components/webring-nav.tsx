import { env } from "@/env.mjs"
import Link from "next/link"

export default function WebringNav() {
    const webringId = env.WEBRING_ID

    if (webringId === undefined) return null

    return (
        <nav
            className="sticky bottom-0 inset-x-0 dark:bg-neutral-950 bg-white text-xs py-4 px-6 sm:px-4 sm:py-2
            border-t border-neutral-50 dark:border-neutral-900 flex justify-between z-50"
        >
            <Link href={`/webring/${webringId}/prev`}>
                {"<-- Prev"}
            </Link>
            <p>My Webring</p>
            <Link href={`/webring/${webringId}/next`}>
                {"Next -->"}
            </Link>
        </nav>
    )
}
