import {getDatabasePages, Icon, SelectOption} from "@/util/notion";
import {PageObjectResponse} from "@notionhq/client/build/src/api-endpoints";

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
    content: PageObjectResponse;
    image?: string;
    tags: SelectOption[];
    slug: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    const data = await getDatabasePages(
        process.env.NOTION_BLOG_DATABASE_ID || "",
        {
            "Name": "title",
            "Tags": "multi_select"
        }
    );

    return data.map(p => ({
        title: p.properties.Name.title[0].plain_text || "Untitled post",
        content: p,
        image: p.cover ? p.cover.type === "external" ? p.cover.external.url : p.cover.type === "file" ? p.cover.file.url : undefined : undefined,
        slug: p.id,
        tags: p.properties.Tags.multi_select.map(t => ({
            name: t.name,
            color: t.color
        }))
    }));
}