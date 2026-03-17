import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET() {
  let prisma: PrismaClient;

  try {
    // Create fresh Prisma client for each request
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });

    await prisma.$connect();

    console.log(`🔍 Fetching emails at ${new Date().toISOString()}`);

    const logs = await prisma.emailLog.findMany({
      orderBy: { timestamp: 'desc' },
       where:{OR:[{site:"Carnivore"} ,{site:null}]}


    });

    console.log(`📊 Found ${logs.length} email logs`);

    await prisma.$disconnect();

    return NextResponse.json(logs, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
        'X-Timestamp': new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('❌ Failed to fetch logs:', error);
    return NextResponse.json({ error: 'Failed to read logs' }, { status: 500 });
  }
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;
