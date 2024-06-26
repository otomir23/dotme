import { ReactNode } from "react"
import { RemixiconComponentType } from "@remixicon/react"
import Anchor from "@/components/anchor"

export type HomeSectionProps = {
    children: ReactNode,
    id: string,
    title: string,
    icon: RemixiconComponentType,
}

export default function HomeSection({ children, title, icon: Icon, id }: HomeSectionProps) {
    return (
        <section className="mt-8 sm:mt-16">
            <Anchor id={id} />
            <h2
                className="text-2xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center
                gap-3"
            >
                <Icon size={32} className="inline text-neutral-900 dark:text-neutral-100" />
                {title}
            </h2>
            {children}
        </section>
    )
}
