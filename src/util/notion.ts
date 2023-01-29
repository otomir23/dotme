import {Client, isFullPage} from "@notionhq/client";
import {SupportedRequestInit, SupportedResponse} from "@notionhq/client/build/src/fetch-types";
import {PageObjectResponse} from "@notionhq/client/build/src/api-endpoints";

export const notionClient = new Client({
    auth: process.env.NOTION_INTEGRATION_TOKEN,
    fetch: async (url: string, {body, method, headers, redirect}: SupportedRequestInit | undefined = {}) => (await fetch(url, {
        body,
        method,
        headers,
        redirect
    })) as SupportedResponse
});

export type Icon = PageObjectResponse["icon"];
export type Property = PageObjectResponse["properties"][keyof PageObjectResponse["properties"]];
export type PropertyType = Property["type"];
export type SelectColor = "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red";


export async function getDatabasePages<T extends Record<string, PropertyType>>(id: string, schema: T) {
    const database = await notionClient.databases.query({
        database_id: id
    })
    return database.results
        .filter(isFullPage)
        .filter((page): page is PageObjectResponse & {
            // every property in the schema must be present and of the correct type
            properties: {
                [K in keyof T]: {
                    type: T[K]
                } & Property
            };
        } => {
            const properties = page.properties;
            return Object
                .entries(schema)
                .every(([key, type]) => properties[key]?.type === type);
        });
}