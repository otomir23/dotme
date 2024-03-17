export type ServerSearchParams = Record<string, string>

export const canonicalUrl = process.env.CANONICAL_URL
    || (process.env.NODE_ENV === "development" ? `http://localhost:${process.env.PORT || 3000}`
        : `https://${process.env.VERCEL_URL}` || "")
