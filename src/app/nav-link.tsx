import {LucideIcon} from "lucide-react";
import Link from "next/link";

export type NavLinkProps = {
    title: string,
    href: string,
    icon: LucideIcon
}

export default function NavLink({title, href, icon: Icon}: NavLinkProps) {
    return (
        <Link
            href={href}
            className="flex flex-row text-neutral-900 dark:text-neutral-100 sm:gap-2 items-center
            hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors focus:outline-none
            focus:bg-neutral-100 dark:focus:bg-neutral-800 rounded focus:ring-4 text-xl sm:text-base
            ring-neutral-100 dark:ring-neutral-800 gap-4"
        >
            <Icon className="w-6 h-6 sm:w-4 sm:h-4"/>
            {title}
        </Link>
    )
}