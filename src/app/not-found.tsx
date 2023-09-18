import ErrorBase from "@/app/error-base";
import Link from "next/link";
import {SearchXIcon} from "lucide-react";

export const metadata = {
    title: 'Not found'
}

export default function NotFound() {
    return (
        <ErrorBase
            icon={SearchXIcon}
            title="Page not found"
        >
            Sorry, but there{"'"}s no such page on my website.{' '}
            Here{"'"}s a link to <Link href="/" className="decoration-dashed underline underline-offset-4"> the homepage</Link>,{' '}
            or if you believe this is an error, you can{' '}
            <Link className="decoration-dashed underline underline-offset-4" href="https://t.me/otomir23">contact me</Link>.
        </ErrorBase>
    )
}