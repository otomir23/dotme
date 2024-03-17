"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"
import { SearchIcon } from "lucide-react"

export type SearchableClientProps = {
    initialValue?: string,
    property: string,
    placeholder?: string,
    children: ReactNode,
    skeleton: ReactNode,
    aside?: ReactNode,
}

export default function SearchableClient(
    { initialValue, property, placeholder = "", children, skeleton, aside }: SearchableClientProps
) {
    const router = useRouter()
    const [transition, setTransition] = useState(false)
    const searchParams = useSearchParams()
    useEffect(() => {
        setTransition(false)
    }, [searchParams])

    return (
        <div className="flex flex-col gap-4 mt-4 sm:mt-8">
            <aside className="flex items-center gap-2">
                <form className="relative flex-1" onSubmit={e => e.preventDefault()}>
                    <input
                        onChange={(e) => {
                            setTransition(true)
                            const newSearchParams = new URLSearchParams(searchParams)
                            newSearchParams.set(property, e.target.value)
                            router.replace(`?${newSearchParams}`, { scroll: false })
                        }}
                        name={property}
                        className="border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900
                        text-lg rounded-lg appearance-none w-full focus:outline-none focus:ring ring-neutral-100
                        dark:ring-neutral-900 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 py-2 px-4"
                        placeholder={placeholder}
                        defaultValue={initialValue}
                    />
                    <button
                        type="submit"
                        className="absolute right-4 top-1/2 -translate-y-1/2 focus:outline-none focus:scale-125
                        transition-transform"
                        aria-label={placeholder}
                    >
                        <SearchIcon size={16} />
                    </button>
                </form>
                {aside}
            </aside>
            {transition
                ? skeleton
                : children}
        </div>
    )
}
