import {getDatabasePages, Icon, SelectOption} from "@/util/notion";

export type Social = {
    name: string;
    icon: Icon;
    link: string;
}

export async function getSocials(): Promise<Social[]> {
    const data = await getDatabasePages(
        process.env.NOTION_SOCIALS_DATABASE_ID || "",
        {
            "Name": "title",
            "URL": "url"
        }
    );

    return data.map(p => ({
        name: p.properties.Name.title[0].plain_text || "Unknown link",
        link: p.properties.URL.url || "about:blank",
        icon: p.icon
    }));
}

export type Project = {
    name: string;
    description: string;
    link: string;
    icon: Icon;
    tags: SelectOption[];
}

export async function getProjects(): Promise<Project[]> {
    const data = await getDatabasePages(
        process.env.NOTION_PROJECTS_DATABASE_ID || "",
        {
            "Name": "title",
            "Description": "rich_text",
            "URL": "url",
            "Tags": "multi_select"
        }
    );

    return data.map(p => ({
        name: p.properties.Name.title[0].plain_text || "Unnamed project",
        description: p.properties.Description.rich_text[0].plain_text || "There's no description for this project, but I'm sure it's great!",
        link: p.properties.URL.url || "about:blank",
        icon: p.icon,
        tags: p.properties.Tags.multi_select.map(t => ({
            name: t.name,
            color: t.color
        }))
    }));
}

export type BlogPost = {
    title: string;
    image?: string;
    tags: SelectOption[];
    slug: string;
    postedAt: number;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    const data = await getDatabasePages(
        process.env.NOTION_BLOG_DATABASE_ID || "",
        {
            "Name": "title",
            "Tags": "multi_select",
            "Slug": "rich_text"
        }
    );

    return data.map(p => ({
        title: p.properties.Name.title[0].plain_text || "Untitled post",
        image: p.cover ? p.cover.type === "external" ? p.cover.external.url : p.cover.type === "file" ? p.cover.file.url : undefined : undefined,
        slug: p.properties.Slug.rich_text[0].plain_text || p.id,
        postedAt: new Date(p.created_time).valueOf(),
        tags: p.properties.Tags.multi_select.map(t => ({
            name: t.name,
            color: t.color
        }))
    }));
}

export async function getBlogPost(slug: string) {
    const data = await getDatabasePages(
        process.env.NOTION_BLOG_DATABASE_ID || "",
        {
            "Slug": "rich_text"
        }
    );
    const id = data.find(p => p.properties.Slug.rich_text[0].plain_text === slug)?.id;
    if (!id) return undefined;

    return await fetch(`https://notion-api.splitbee.io/v1/page/${id}`).then(r => r.json());
}