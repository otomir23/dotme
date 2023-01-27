import ThemeToggle from "@/app/theme-toggle";
import {
    Bars3Icon,
    BriefcaseIcon,
    LinkIcon,
    PencilIcon,
    WrenchScrewdriverIcon,
    XMarkIcon
} from "@heroicons/react/20/solid";

export default function Home() {
    const nav = [
        {name: "Socials", href: "#socials", icon: LinkIcon},
        {name: "Technologies", href: "#stack", icon: WrenchScrewdriverIcon},
        {name: "Projects", href: "#projects", icon: BriefcaseIcon},
        {name: "Blog", href: "#blog", icon: PencilIcon},
    ]

    return (
        <>
            <aside className="flex items-center justify-between mb-8">
                <label>
                    <input type="checkbox" className="hidden peer" />
                    <Bars3Icon className="w-6 h-6 sm:hidden cursor-pointer" />
                    <nav className="
                        -translate-x-full peer-checked:translate-x-0 flex flex-col sm:flex-row sm:gap-6
                        sm:items-center absolute sm:static sm:translate-x-0 transition-transform gap-4
                        bg-neutral-100/95 dark:bg-neutral-900/95 sm:bg-transparent sm:dark:bg-transparent
                        w-full sm:w-auto top-0 left-0 p-8 sm:p-0 h-full sm:h-auto select-none z-10
                    ">
                        <XMarkIcon className="w-8 h-8 sm:hidden cursor-pointer" />
                        {nav.map((item) => (
                            <>
                                <div className="sm:hidden w-full h-px bg-neutral-200 dark:bg-neutral-800" />
                                <a
                                    href={item.href} key={item.name}
                                    className="flex flex-row text-neutral-900 dark:text-neutral-100 gap-2 items-center
                                    hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.name}
                                </a>
                            </>
                        ))}
                    </nav>
                </label>
                <ThemeToggle />
            </aside>
            <p className="text-2xl font-bold">Hello, world!</p>
        </>
    )
}
