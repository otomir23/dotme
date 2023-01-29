import ThemeToggle from "@/app/theme-toggle";
import {
    Bars3Icon,
    BriefcaseIcon,
    LinkIcon,
    MapPinIcon,
    PencilIcon,
    WrenchScrewdriverIcon,
    XMarkIcon
} from "@heroicons/react/20/solid";
// noinspection ES6UnusedImports
import {
    BriefcaseIcon as BigBriefcaseIcon,
    LinkIcon as BigLinkIcon,
    PencilIcon as BigPencilIcon,
    WrenchScrewdriverIcon as BigWrenchScrewdriverIcon
} from "@heroicons/react/24/solid";
import Image from "next/image";
import avatar from "@/../public/avatar.jpg";
import React, {Fragment} from "react";
import Link from "next/link";
import {getBlogPosts, getProjects, getSocials} from "@/util/data";

export default async function Home() {
    const nav = [
        {name: "Socials", href: "#socials", icon: LinkIcon},
        {name: "Technologies", href: "#stack", icon: WrenchScrewdriverIcon},
        {name: "Portfolio", href: "#projects", icon: BriefcaseIcon},
        {name: "Blog", href: "#blog", icon: PencilIcon},
    ]

    const socials = await getSocials();
    const projects = await getProjects();
    const blog = await getBlogPosts();

    return (
        <>
            <aside className="flex items-center justify-between mb-8 sm:mb-16 sm:pt-8 sticky top-8 sm:top-0">
                <label>
                    <input type="checkbox" className="hidden peer"/>
                    <Bars3Icon className="w-6 h-6 sm:hidden cursor-pointer"/>
                    <nav className="
                        -translate-x-full peer-checked:translate-x-0 flex flex-col sm:flex-row sm:gap-6
                        sm:items-center absolute sm:static sm:translate-x-0 transition-transform gap-4
                        bg-neutral-100/95 dark:bg-neutral-900/95 sm:bg-transparent sm:dark:bg-transparent
                        w-screen sm:w-auto -top-8 -left-8 p-8 sm:p-0 h-screen sm:h-auto select-none z-10
                    ">
                        <XMarkIcon className="w-8 h-8 sm:hidden cursor-pointer" key="xmarkicon"/>
                        {nav.map((item) => (
                            <Fragment key={item.name}>
                                <div className="sm:hidden w-full h-px bg-neutral-200 dark:bg-neutral-800"/>
                                <a
                                    href={item.href}
                                    className="flex flex-row text-neutral-900 dark:text-neutral-100 gap-2 items-center
                                    hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                                >
                                    <item.icon className="w-4 h-4"/>
                                    {item.name}
                                </a>
                            </Fragment>
                        ))}
                    </nav>
                </label>
                <ThemeToggle/>
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
                    I live in <MapPinIcon className="w-4 h-4 inline text-blue-600"/>{" "}
                    <span className="underline text-blue-600 cursor-help" title="Great city!">Moscow, Russia</span> and
                    I am a developer, designer and a very lazy person. I primary specialize in web design and
                    development, but I also sometimes create Minecraft mods or Discord bots.
                </p>
            </section>
            <section id="socials" className="mt-8 sm:mt-16">
                <h2 className="text-2xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                    <BigLinkIcon className="w-8 h-8 inline text-neutral-900 dark:text-neutral-100 mr-4"/>
                    Socials
                </h2>
                <div className="flex flex-row gap-4 mt-4 sm:mt-8">
                    {socials.map((social) => (
                        <Link
                            href={social.link} key={social.name}
                            className="rounded-md p-2 border-2 bg-neutral-100 border-neutral-200 text-neutral-900
                            dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-100 fill-current flex
                            justify-center items-center"
                            target="_blank"
                            title={social.name}
                        >
                            {
                                social.icon ?
                                    social.icon.type === "emoji" ?
                                        <span className="text-sm">{social.icon.emoji}</span> :
                                    social.icon.type === "file" ?
                                        <Image
                                            src={social.icon.file.url} alt={social.name} width={20} height={20}
                                            className="w-5 h-5 brightness-0 dark:invert"
                                        /> :
                                    social.icon.type === "external" ?
                                        <Image
                                            src={social.icon.external.url} alt={social.name} width={20} height={20}
                                            className="w-5 h-5 brightness-0 dark:invert"
                                        /> :
                                    <LinkIcon className="w-5 h-5"/>
                                : <LinkIcon className="w-5 h-5"/>
                            }
                        </Link>
                    ))}
                </div>
            </section>
            <section id="projects" className="mt-8 sm:mt-16">
                <h2 className="text-2xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                    <BigBriefcaseIcon className="w-8 h-8 inline text-neutral-900 dark:text-neutral-100 mr-4"/>
                    Portfolio
                </h2>
                <div className="flex flex-col gap-4 mt-4 sm:mt-8">
                    {projects.map((project) => (
                        <Link
                            href={project.link} key={project.name}
                            className="flex flex-col gap-3 rounded-md border p-6
                            border-neutral-200 dark:border-neutral-800"
                            target="_blank"
                            title={project.name}
                        >
                            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                                {project.name}
                            </h3>
                            <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-md break-words">
                                {project.description}
                            </p>
                            <div className="flex flex-row gap-2">
                                {project.tags.map((tag) => (
                                    <span
                                        className="text-xs sm:text-sm px-2 py-1 rounded-md bg-neutral-100
                                        dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300"
                                        key={tag.name}
                                    >
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
            <section id="blog" className="mt-8 sm:mt-16">
                <h2 className="text-2xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                    <BigPencilIcon className="w-8 h-8 inline text-neutral-900 dark:text-neutral-100 mr-4"/>
                    Blog
                </h2>
                <div className="flex flex-col gap-4 mt-4 sm:mt-8">
                    {blog.map((post) => (
                        <Link
                            href={`/blog/${post.slug}`} key={post.slug}
                            className="flex flex-col gap-3 rounded-md border border-neutral-200 dark:border-neutral-800"
                        >
                            {post.image && <Image src={post.image} alt={post.title} width={1280} height={720}
                                    className="rounded-t-md aspect-video object-cover w-full h-48"
                            />}
                            <div className="flex flex-col gap-2 p-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                                    {post.title}
                                </h3>
                                <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-md break-words">
                                    meow
                                </p>
                                <div className="flex flex-row gap-2">
                                    {post.tags.map((tag) => (
                                        <span
                                            className="text-xs sm:text-sm px-2 py-1 rounded-md bg-neutral-100
                                            dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300"
                                            key={tag.name}
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    )
}
