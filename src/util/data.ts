import {getDatabasePages, Icon} from "@/util/notion";

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