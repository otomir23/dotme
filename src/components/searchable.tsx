import { ReactNode } from "react"
import { SearchXIcon } from "lucide-react"
import SearchableClient, { SearchableClientProps } from "@/components/searchable-client"

export type SearchableProps<T> = {
    data: T[],
    children: (element: T) => ReactNode,
    plural: string,
} & Omit<SearchableClientProps, "children">

export default function Searchable<T>({ children, data, plural, ...searchProps }: SearchableProps<T>) {
    return (
        <SearchableClient {...searchProps}>
            {
                data.length > 0
                    ? data.map(children)
                    : (
                        <p className="text-sm text-neutral-700 dark:text-neutral-300">
                            <SearchXIcon className="inline w-4 h-4" /> Sorry, no {plural} found.
                        </p>
                        )
            }
        </SearchableClient>
    )
}
