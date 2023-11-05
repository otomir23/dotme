import {LucideIcon} from "lucide-react";
import Link from "next/link";

export type NavLinkProps = {
    title: string,
    href: string,
    icon: LucideIcon,
    hamburger?: boolean
}

export default function NavLink({title, href, hamburger = false, icon: Icon}: NavLinkProps) {
    return (
        <Link
            href={href}
            className={`
                flex flex-row text-neutral-900 dark:text-neutral-100 items-center focus:outline-none
                hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors dark:ring-neutral-800 
                focus:bg-neutral-100 dark:focus:bg-neutral-800 rounded focus:ring-4 ring-neutral-100
                ${hamburger ?
                "gap-4 sm:gap-2 text-xl sm:text-base" :
                "gap-2"}
            `}
        >
            <Icon className={hamburger ? "w-6 h-6 sm:w-4 sm:h-4" : "w-4 h-4"}/>
            {title}
        </Link>
    )
}