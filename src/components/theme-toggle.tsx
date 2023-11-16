"use client";

import { useTheme } from "next-themes";
import {useEffect, useMemo, useState} from "react";
import {LucideIcon, SunIcon, MoonIcon} from "lucide-react";
import {Button} from "@/components/button";

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [themeIcon, setThemeIcon] = useState(true);

    useEffect(() => {
        setThemeIcon(resolvedTheme === "dark");
    }, [resolvedTheme]);

    const ThemeIcon = useMemo<LucideIcon>(() => themeIcon ? SunIcon : MoonIcon, [themeIcon]);

    return (
        <Button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label={`Switch theme to ${resolvedTheme === "dark" ? "light" : "dark"}`}
        >
            <ThemeIcon size={16} />
        </Button>
    );
}