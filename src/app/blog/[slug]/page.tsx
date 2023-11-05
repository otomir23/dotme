import {getBlogPost} from "@/util/data";
import {notFound} from "next/navigation";
import ThemeToggle from "@/components/theme-toggle";
import ReactMarkdown from 'react-markdown'
import Image from "next/image";
import DatabaseError from "@/components/database-error";
import NavLink from "@/components/nav-link";
import {HomeIcon} from "lucide-react";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import {ComponentProps} from "react";
import StyledLink from "@/components/styled-link";

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
    const data = await getBlogPost(slug);
    if (!data) notFound()

    return {
        title: data.title,
        description: data.content
    }
}

export default async function BlogPost({ params: { slug } }: { params: { slug: string } }) {
    const data = await getBlogPost(slug).catch(e => {
        console.error(e);
        return "error" as const;
    });

    if (!data) {
        console.log(`No blog post found for slug: ${slug}`);
        notFound();
    }

    if (data === 'error')
        return <DatabaseError />

    return (
        <div>
            <nav className="flex items-center justify-between sticky top-0 pt-8 bg-white dark:bg-neutral-950 pb-4 mb-4">
                <NavLink title="Home" href="/" icon={HomeIcon} />
                <ThemeToggle />
            </nav>
            <article className="prose prose-neutral dark:prose-invert prose-img:rounded w-full max-w-none">
                {data.image && <Image
                    src={data.image} alt={data.title} width={1024} height={256}
                    className="object-cover w-full aspect-[3/1] mb-4 rounded"
                />}
                <ReactMarkdown remarkPlugins={[ remarkGfm, remarkToc ]} rehypePlugins={[ rehypeSlug ]} components={{
                    'a': ({href, ref, ...props}: ComponentProps<'a'>) => <StyledLink href={href || "#"} target={href && !href.startsWith('#') ? "_blank" : undefined} {...props} />
                }}>
                    {`# ${data.title}\n\n${data.content}`}
                </ReactMarkdown>
            </article>
        </div>
    );
}