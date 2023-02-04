import {getBlogPost, getBlogPosts} from "@/util/data";
import Notion from "@/app/blog/notion";
import {notFound} from "next/navigation";
import ThemeToggle from "@/app/theme-toggle";
import Link from "next/link";

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
        return notFound();
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
            <Notion blockMap={data} fullPage={true} hideHeader={true} />
        </div>
    );
}