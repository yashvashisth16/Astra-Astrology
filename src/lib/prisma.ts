import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

// 1. Get the connection string (Must use the 6543 Pooler URL)
const connectionString = `${process.env.DATABASE_URL}`

// 2. Set up the IPv4 Pool for Vercel
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

// 3. Create a safe global connection for Next.js
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma