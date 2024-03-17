import { PrismaClient } from "@prisma/client"

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient
}

function getPrisma(): PrismaClient {
    if (process.env.NODE_ENV === "production") {
        return new PrismaClient()
    } else {
        if (!global.prisma) {
            global.prisma = new PrismaClient()
        }
        return global.prisma
    }
}

export default getPrisma()
