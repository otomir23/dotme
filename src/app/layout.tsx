import './globals.css'

import {Inter} from '@next/font/google'
import React from "react";
import Providers from "@/app/providers";

const inter = Inter({subsets: ['latin']})

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head />
            <body className={inter.className}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
