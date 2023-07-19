"use client"

import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

export default function Search({property, placeholder = ""}: {property: string, placeholder?: string}) {
    const router = useRouter()
    const [transition, setTransition] = useState(false)
    const searchParams = useSearchParams()
    useEffect(() => {
        setTransition(false)
    }, [searchParams])

    return (
        <>
            <input
                onChange={e => {
                    setTransition(true)
                    const newSearchParams = new URLSearchParams(searchParams);
                    newSearchParams.set(property, e.target.value)
                    router.replace(`?${newSearchParams}`)
                }}
                className="border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-lg
                py-2 px-4 rounded-lg appearance-none w-full focus:outline-none focus:ring ring-neutral-100 dark:ring-neutral-900
                placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                placeholder={placeholder}
            />
            {transition && <div className="animate-spin border border-transparent border-b-neutral-500 aspect-square h-4 rounded-full" />}
        </>
    )
}