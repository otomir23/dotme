"use client";

import { useTheme } from "next-themes";
import {useEffect, useMemo, useState} from "react";
import {LucideIcon, SunIcon, MoonIcon} from "lucide-react";

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [themeIcon, setThemeIcon] = useState(true);

    useEffect(() => {
        setThemeIcon(resolvedTheme === "dark");
    }, [resolvedTheme]);

    const ThemeIcon = useMemo<LucideIcon>(() => themeIcon ? SunIcon : MoonIcon, [themeIcon]);

    return (
        <button
            className="rounded-md p-2 border-2 bg-neutral-100 border-neutral-200 text-neutral-900 focus:outline-none
            dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-100 focus:ring ring-neutral-100 dark:ring-neutral-900"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
            <ThemeIcon size={16} />
        </button>
    );
}