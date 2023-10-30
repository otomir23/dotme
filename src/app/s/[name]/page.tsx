import {getSocial} from "@/util/data";
import {notFound, redirect} from "next/navigation";

export default async function Social({params: {name}}: {params: {name: string}}) {
    const social = await getSocial(name);
    if (!social) notFound();
    redirect(social.link);
}