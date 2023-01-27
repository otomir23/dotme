import ThemeToggle from "@/app/theme-toggle";
import {
    Bars3Icon,
    BriefcaseIcon,
    LinkIcon, MapPinIcon,
    PencilIcon,
    WrenchScrewdriverIcon,
    XMarkIcon
} from "@heroicons/react/20/solid";
import Image from "next/image";
import avatar from "@/../public/avatar.jpg";

export default function Home() {
    const nav = [
        {name: "Socials", href: "#socials", icon: LinkIcon},
        {name: "Technologies", href: "#stack", icon: WrenchScrewdriverIcon},
        {name: "Projects", href: "#projects", icon: BriefcaseIcon},
        {name: "Blog", href: "#blog", icon: PencilIcon},
    ]

    return (
        <>
            <aside className="flex items-center justify-between mb-8 sm:mb-16 sm:mt-8">
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
            <section id="me">
                <div className="flex flex-row gap-8 items-center">
                    <Image src={avatar} alt="My avatar"
                           width={128} height={128} quality={100}
                           className="rounded-full aspect-square object-cover w-32 h-32"
                    />
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                            Damir Modyarov
                        </h1>
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-lg">
                            Web Developer, UI Designer
                        </p>
                    </div>
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-lg mt-4 sm:mt-8">
                    Hi! I’m Damir Modyarov <span className="text-neutral-500"> (@otomir23)</span>.
                    I live in <MapPinIcon className="w-4 h-4 inline text-blue-600" />{" "}
                    <span className="underline text-blue-600 cursor-help" title="Great city!">Moscow, Russia</span> and
                    I am a developer, designer and a very lazy person. I primary specialize in web design and development,
                    but I also sometimes create Minecraft mods or Discord bots.
                </p>
            </section>
        </>
    )
}
