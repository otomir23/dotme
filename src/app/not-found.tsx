import ErrorBase from "@/app/error-base";
import StyledLink from "@/app/styled-link";
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
            Here{"'"}s a link to <StyledLink href="/"> the homepage</StyledLink>,{' '}
            or if you believe this is an error, you can{' '}
            <StyledLink href="https://t.me/otomir23">contact me</StyledLink>.
        </ErrorBase>
    )
}