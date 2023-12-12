import './globals.css'

import {Inter} from 'next/font/google'
import React from "react";
import Providers from "@/app/providers";
import {Metadata} from "next";
import Script from 'next/script';

const inter = Inter({subsets: ['latin']})

export default function RootLayout({children}: { children: React.ReactNode }) {
    // noinspection HtmlRequiredTitleElement
    return (
        <html lang="en" className="scroll-smooth">
            <head />
            {process.env.UMAMI_WEBSITE_ID && <Script src="https://us.umami.is/script.js" data-website-id={process.env.UMAMI_WEBSITE_ID} />}
            <body className={`${inter.className} dark:bg-neutral-950 bg-white dark:text-white`}>
                <Providers>
                    <main
                        className="max-w-4xl mx-auto px-8 pb-8
                        selection:bg-neutral-300 selection:text-black
                        dark:selection:bg-neutral-700 dark:selection:text-white"
                    >
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
