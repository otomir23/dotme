import { RemixiconComponentType, RiErrorWarningFill } from "@remixicon/react"
import { ReactNode } from "react"
import StyledLink from "@/components/styled-link"

export type ErrorBaseProps = {
    icon?: RemixiconComponentType,
    title?: string,
    children?: ReactNode,
}

export default function ErrorBase(
    {
        icon: Icon = RiErrorWarningFill,
        title = "Unknown error",
        children: description = (
            <>
                Please{" "}
                <StyledLink href="https://t.me/otomir23">contact me</StyledLink>{" "}
                to resolve the issue.
            </>
        ),
    }: ErrorBaseProps
) {
    return (
        <div className="mx-auto pt-32 text-center max-w-md w-full">
            <Icon size={32} className="inline mb-4" />
            <h1 className="text-2xl font-bold">{title}</h1>
            <p>{description}</p>
        </div>
    )
}
