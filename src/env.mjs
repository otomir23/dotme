import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
    server: {
        CANONICAL_URL: z.preprocess(
            str => str ?? (process.env.NODE_ENV === "production"
                ? `https://${process.env.VERCEL_URL}`
                : `http://localhost:${process.env.PORT || 3000}`),
            z.string().url()
        ),
        DATABASE_URL: z.string().url(),
        LASTFM_API_KEY: z.string().length(32),
        LASTFM_USERNAME: z.string(),
        UMAMI_WEBSITE_ID: z.string().uuid().optional(),
    },
    client: {},
    experimental__runtimeEnv: {},
})
