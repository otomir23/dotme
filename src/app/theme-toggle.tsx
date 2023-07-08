"use client";

import { useTheme } from "next-themes";
import {useEffect, useState} from "react";
import {SunIcon, MoonIcon} from "@heroicons/react/20/solid";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [themeIcon, setThemeIcon] = useState(true);

    useEffect(() => {
        setThemeIcon(theme === "dark");
    }, [theme]);

    const ThemeIcon = themeIcon ? SunIcon : MoonIcon;

    return (
        <button
            className="rounded-md p-2 border-2 bg-neutral-100 border-neutral-200 text-neutral-900 focus:outline-none
            dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-100 focus:ring ring-neutral-100 dark:ring-neutral-900"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            <ThemeIcon className="w-4 h-4" />
        </button>
    );
}