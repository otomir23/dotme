"use client";

import { NotionRenderer } from 'react-notion';
import "@/app/blog/notion.css"
import "prism-themes/themes/prism-coldark-dark.min.css"

export default function Notion(props: Parameters<typeof NotionRenderer>[0]) {
    return <NotionRenderer {...props} />;
}