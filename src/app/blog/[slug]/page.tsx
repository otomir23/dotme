import {getBlogPost, getBlogPosts} from "@/util/data";
import {notFound} from "next/navigation";
import ThemeToggle from "@/app/theme-toggle";
import Link from "next/link";
import ReactMarkdown from 'react-markdown'
import Image from "next/image";

export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost({ params: { slug } }: { params: { slug: string } }) {
    const data = await getBlogPost(slug);

    if (!data) {
        console.log(`No blog post found for slug: ${slug}`);
        notFound();
    }

    return (
        <div>
            <nav className="flex items-center justify-between">
                <Link href="/" className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">
                    &lt;--- Home
                </Link>
                <ThemeToggle />
            </nav>
            <div className="h-8" />
            {data.image && <Image
                src={data.image} alt={data.title} width={1024} height={256}
                className="object-cover w-full aspect-[3/1] md:aspect-[4/1] mb-4 rounded"
            />}
            <h1 className="font-bold text-3xl">{data.title}</h1>
            <ReactMarkdown>
                {data.content}
            </ReactMarkdown>
        </div>
    );
}