import ThemeToggle from "@/app/theme-toggle";
import {
    AlertTriangle,
    BriefcaseIcon,
    LinkIcon,
    MapPinIcon,
    MenuIcon,
    Music4Icon,
    PenIcon,
    WrenchIcon,
    XIcon
} from "lucide-react";
import Image from "next/image";
import avatar from "@/../public/avatar.jpg";
import Link from "next/link";
import {getBlogPosts, getNowPlaying, getProjects, getSocials, getStack} from "@/util/data";
import { formatDistanceToNow } from 'date-fns';
import DatabaseError from "@/app/database-error";
import {canonicalUrl, ServerSearchParams} from "@/util/util";
import Anchor from "@/app/anchor";
import Searchable from "@/app/searchable";
import {Metadata} from "next";
import HomeSection from "@/app/home-section";
import NavLink from "@/app/nav-link";
import StyledLink from "@/app/styled-link";

export const dynamic = 'force-dynamic'

export function generateMetadata({searchParams}: {searchParams: ServerSearchParams}): Metadata {
    return {
        metadataBase: new URL(canonicalUrl),
        robots: {
            // Hide filtered versions from search
            index: Object.entries(searchParams).length === 0
        },
        alternates: {
            canonical: '/'
        }
    }
}

const load = async (searchParams: ServerSearchParams) => {
    const [
        socials,
        stack,
        projects,
        blog,
        nowPlaying,
    ] = await Promise.all([
        getSocials(),
        getStack(),
        getProjects(searchParams['project'] || null, Number(searchParams['tool']) || null),
        getBlogPosts(searchParams['post'] || null),
        getNowPlaying(),
    ])

    return {
        socials,
        stack,
        projects,
        blog,
        nowPlaying,
    }
}

export default async function Home({searchParams}: {searchParams: ServerSearchParams}) {
    const pageData = await load(searchParams).catch(e => {
        console.error(e);
        return null;
    });
    if (!pageData)
        return <DatabaseError />
    const {
        socials,
        stack,
        projects,
        blog,
        nowPlaying
    } = pageData;
    const nowPlayingCover = nowPlaying?.image?.find(i => i.size === 'large')?.url || null;
    const {tool, ...clearSearchParams} = searchParams;
    const selectedTool = tool && stack
        .map(c => c.tools)
        .flat()
        .find(t => String(t.id) === tool)
        || null;

    return (
        <>
            <aside
                className="flex items-center justify-between mb-8 sm:mb-16 pt-8 sticky top-0 bg-white
                ring-8 ring-white dark:bg-neutral-950 dark:ring-neutral-950 z-10"
            >
                <label>
                    <input type="checkbox" className="hidden peer"/>
                    <MenuIcon className="sm:hidden cursor-pointer"/>
                    <nav className="
                        -translate-x-full peer-checked:translate-x-0 flex flex-col sm:flex-row gap-6
                        sm:items-center absolute sm:static sm:translate-x-0 transition-transform
                        bg-white dark:bg-neutral-950 sm:bg-transparent sm:dark:bg-transparent
                        w-screen sm:w-auto top-0 -left-8 p-8 sm:p-0 h-screen sm:h-auto select-none z-10
                    ">
                        <XIcon size={32} className="sm:hidden cursor-pointer" key="xmarkicon"/>
                        <NavLink title="Socials" href="#socials" icon={LinkIcon} hamburger />
                        <NavLink title="Technologies" href="#stack" icon={WrenchIcon} hamburger />
                        <NavLink title="Portfolio" href="#projects" icon={BriefcaseIcon} hamburger />
                        <NavLink title="Blog" href="#blog" icon={PenIcon} hamburger />
                    </nav>
                </label>
                <ThemeToggle/>
            </aside>
            <section>
                <Anchor id="me" />
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
                    I live in <MapPinIcon size={16} className="inline"/>{" "}
                    <span className="font-bold cursor-help" title="Great city!">Moscow, Russia</span> and
                    I am a developer, designer and a very lazy person. I primary specialize in web design and
                    development, but I also sometimes create Minecraft mods or Discord bots.{" "}
                    <StyledLink href="/blog/about-me">More {'-->'}</StyledLink>
                </p>
            </section>
            <HomeSection id="socials" title="Socials" icon={LinkIcon}>
                <div className="flex flex-row gap-4 mt-4 sm:mt-8 flex-wrap">
                    {socials.map((social) => (
                        <Link
                            href={social.link} key={social.name}
                            className="rounded-md p-2 border-2 bg-neutral-100 border-neutral-200 text-neutral-900
                            dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-100 fill-current flex
                            justify-center items-center focus:outline-none focus:ring ring-neutral-100
                            dark:ring-neutral-900"
                            target="_blank"
                            title={social.name}
                        >
                            <Image
                                src={social.icon} alt={social.name} width={20} height={20}
                                className="w-5 h-5 brightness-0 dark:invert"
                            />
                        </Link>
                    ))}
                </div>
            </HomeSection>
            <HomeSection id="stack" title="Technologies" icon={WrenchIcon}>
                <div className="flex flex-col gap-4 mt-4 sm:mt-8">
                    {stack.map(s => (
                        <figure key={s.id}>
                            <figcaption className="uppercase font-bold text-neutral-600 dark:text-neutral-400">
                                {s.name}
                            </figcaption>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {s.tools.map((t) => (
                                    <Link
                                        key={t.id} href={`?tool=${t.id}#projects`} rel="nofollow"
                                        className="focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-800
                                        rounded focus:ring-4 ring-neutral-100 dark:ring-neutral-900"
                                    >
                                        <Image
                                            src={t.icon} alt={t.name} width={20} height={20}
                                            className="w-5 h-5 brightness-0 dark:invert"
                                        />
                                    </Link>
                                ))}
                            </div>
                        </figure>
                    ))}
                </div>
            </HomeSection>
            <HomeSection id="projects" title="Portfolio" icon={BriefcaseIcon}>
                <Searchable
                    data={projects}
                    plural="projects"
                    property="project"
                    placeholder="Find projects..."
                    skeleton={<div className="rounded-lg bg-neutral-200 dark:bg-neutral-800 animate-pulse h-40" />}
                    aside={selectedTool &&
                        <Link
                            className="min-w-max h-full rounded-md border-2 bg-neutral-100 border-neutral-200 gap-2
                                    text-neutral-900 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-100
                                    focus:outline-none focus:ring ring-neutral-100 dark:ring-neutral-900 py-3 px-4 flex"
                            href={`/?${new URLSearchParams(clearSearchParams).toString()}`}
                            scroll={false}
                        >
                            <Image
                                src={selectedTool.icon} alt={selectedTool.name} width={20} height={20}
                                className="w-4 h-4 brightness-0 dark:invert"
                            />
                            <XIcon size={16} />
                        </Link>
                    }
                >
                    {(project) => (
                        <Link
                            href={project.link} key={project.name}
                            className="flex flex-col gap-1 rounded-lg border p-6 focus:outline-none focus:ring ring-neutral-100
                            dark:ring-neutral-900 border-neutral-200 dark:border-neutral-800"
                            target="_blank"
                            title={project.name}
                        >
                            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                                {project.name}
                            </h3>
                            <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-md break-words">
                                {project.description}
                            </p>
                            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm">
                                {formatDistanceToNow(project.releasedAt)} ago
                            </p>
                            <div className="flex flex-row gap-2 flex-wrap mt-2">
                                {project.tools.map(({tool}) => (
                                    <span
                                        className="text-xs sm:text-sm px-2 py-1 rounded-md font-bold bg-[var(--light-color)]
                                        dark:bg-[var(--dark-color)] text-[var(--dark-color)] dark:text-[var(--light-color)]"
                                        style={{
                                            // @ts-ignore
                                            '--light-color': tool.lightColor,
                                            '--dark-color': tool.darkColor
                                        }}
                                        key={tool.id}
                                    >
                                        {tool.name}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    )}
                </Searchable>
            </HomeSection>
            <HomeSection id="blog" title="Blog" icon={PenIcon}>
                <Searchable
                    property="post"
                    placeholder="Find posts..."
                    data={blog}
                    plural="blog pots"
                    skeleton={<div className="rounded-lg bg-neutral-200 dark:bg-neutral-800 animate-pulse h-72" />}
                >
                    {(post) => (
                        <Link
                            href={`/blog/${post.slug}`} key={post.slug}
                            className="flex flex-col rounded-md border border-neutral-200 dark:border-neutral-800
                            focus:outline-none focus:ring ring-neutral-100 dark:ring-neutral-900"
                        >
                            {post.image && <Image src={post.image} alt={post.title} width={1280} height={720}
                                                  className="rounded-t-md aspect-video object-cover w-full h-48"
                            />}
                            <div className="flex flex-col gap-2 p-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                                    {post.title}
                                </h3>
                                <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-md break-words">
                                    {formatDistanceToNow(post.postedAt)} ago
                                </p>
                            </div>
                        </Link>
                    )}
                </Searchable>
            </HomeSection>
            <section
                className="mt-4 sm:mt-8 border bg-red-50 dark:bg-red-950 border-red-100 dark:border-red-900 text-red-900
                dark:text-red-100 p-4 rounded-md relative"
            >
                <Anchor id="lastfm" />
                <h3 className="text-lg font-bold mb-4">
                    <Music4Icon className="inline mr-2" /> Listening to
                </h3>
                {nowPlaying ?
                    <Link
                        className="flex gap-4 sm:flex-row flex-col focus:outline-none focus:bg-red-100
                        dark:focus:bg-red-900 transition-colors focus:ring-8 ring-red-100 dark:ring-red-900 rounded-md"
                        href={nowPlaying.url} target="_blank"
                    >
                        {nowPlayingCover ?
                            <Image
                                src={nowPlayingCover}
                                alt={`Album cover of ${nowPlaying.name} by ${nowPlaying.artist.name}`}
                                width={174} height={174}
                                className="rounded-md"
                            /> :
                            <div className="w-[174px] h-[174px] rounded-md bg-white dark:bg-neutral-950 flex items-center justify-center">
                                <Music4Icon size={48} className="inline mr-2 text-neutral-500" />
                            </div>
                        }
                        <figcaption className="sm:py-2">
                            <h4 className="text-2xl">{nowPlaying.name}</h4>
                            <h5 className="text-lg">
                                <span className="text-red-800 dark:text-red-200">by</span> {nowPlaying.artist.name}
                            </h5>
                        </figcaption>
                    </Link>:
                    <p className="animate-pulse">Nothing right now</p>
                }
                <Link className="absolute right-2 bottom-2 text-xs" href="https://last.fm" target="_blank">
                    Powered by Last.fm
                </Link>
            </section>
            <noscript>
                <p className="mt-4 sm:mt-8">
                    <AlertTriangle className="inline" />{' '}
                    Hi again! Looks like you have JS disabled. I tried to optimise the website to be usable without scripts,
                    but some things may still be broken. If you find that something is not working right, open an issue or{' '}
                    <Link className="decoration-dashed underline underline-offset-4" href="https://t.me/otomir23">
                        contact me
                    </Link>{' '}
                    to resolve the issue.
                </p>
            </noscript>
        </>
    )
}
