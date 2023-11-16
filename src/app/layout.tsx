import './globals.css'

import {Inter} from 'next/font/google'
import React from "react";
import Providers from "@/app/providers";
import {Metadata} from "next";

const inter = Inter({subsets: ['latin']})

export default function RootLayout({children}: { children: React.ReactNode }) {
    // noinspection HtmlRequiredTitleElement
    return (
        <html lang="en" className="scroll-smooth">
            <head />
            <body className={`${inter.className} dark:bg-neutral-950 bg-white dark:text-white`}>
                <Providers>
                    <main className="max-w-4xl mx-auto px-8 pb-8">
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    )
}

export const metadata: Metadata = {
    title: {
        default: 'Damir Modyarov | @otomir23',
        template: '%s | @otomir23',
    },
    description: "Damir Modyarov is a student web developer and UI designer from Moscow, Russia."
}
