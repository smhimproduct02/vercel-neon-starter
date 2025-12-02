'use server';

import prisma from '@/lib/prisma';

export interface PhoneTopUpData {
    phoneNumber: string;
    simCardId?: number | null;
    name?: string | null;
    status: string;
    wsStatus?: string | null;
    topUpAmount: string;
    topUpDate?: Date | null;
    renewalDate?: Date | null;
    price: string;
    notes?: string | null;
}

// Get all phone top-ups with optional filters
export async function getPhoneTopUps(filters?: {
    status?: string;
    wsStatus?: string;
    search?: string;
}) {
    try {
        const where: any = {};

        if (filters?.status && filters.status !== 'All') {
            where.status = filters.status;
        }

        if (filters?.wsStatus && filters.wsStatus !== 'All') {
            where.wsStatus = filters.wsStatus;
        }

        if (filters?.search) {
            const searchInt = parseInt(filters.search);
            where.OR = [
                { phoneNumber: { contains: filters.search, mode: 'insensitive' } },
                { name: { contains: filters.search, mode: 'insensitive' } },
            ];

            if (!isNaN(searchInt)) {
                where.OR.push({ simCardId: searchInt });
            }
        }

        const topUps = await prisma.phoneTopUp.findMany({
            where,
            orderBy: { renewalDate: 'asc' },
        });

        return { success: true, data: topUps };
    } catch (error: any) {
        console.error('Error fetching phone top-ups:', error);
        return { success: false, error: error.message };
    }
}

// Get a single phone top-up by ID
export async function getPhoneTopUpById(id: string) {
    try {
        const topUp = await prisma.phoneTopUp.findUnique({
            where: { id },
        });

        if (!topUp) {
            return { success: false, error: 'Record not found' };
        }

        return { success: true, data: topUp };
    } catch (error: any) {
        console.error('Error fetching phone top-up:', error);
        return { success: false, error: error.message };
    }
}

// Get dashboard statistics
export async function getPhoneTopUpStats() {
    try {
        const [
            total,
            active,
            terminated,
            wsBanned,
            upcomingRenewals
        ] = await Promise.all([
            prisma.phoneTopUp.count(),
            prisma.phoneTopUp.count({ where: { status: 'Active' } }),
            prisma.phoneTopUp.count({ where: { status: { contains: 'Terminated' } } }),
            prisma.phoneTopUp.count({ where: { wsStatus: { in: ['Banned', 'Permanent Banned'] } } }),
            prisma.phoneTopUp.count({
                where: {
                    renewalDate: {
                        gte: new Date(),
                        lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next 7 days
                    },
                },
            }),
        ]);

        const monthlyCost = active * 5; // RM5 per active SIM

        return {
            success: true,
            data: {
                total,
                active,
                terminated,
                wsBanned,
                upcomingRenewals,
                monthlyCost,
            },
        };
    } catch (error: any) {
        console.error('Error fetching phone top-up stats:', error);
        return { success: false, error: error.message };
    }
}

// Create a new phone top-up record
export async function createPhoneTopUp(data: PhoneTopUpData) {
    try {
        const topUp = await prisma.phoneTopUp.create({
            data: {
                phoneNumber: data.phoneNumber,
                simCardId: data.simCardId,
                name: data.name,
                status: data.status,
                wsStatus: data.wsStatus,
                topUpAmount: data.topUpAmount,
                topUpDate: data.topUpDate,
                renewalDate: data.renewalDate,
                price: data.price,
                notes: data.notes,
            },
        });

        return { success: true, data: topUp };
    } catch (error: any) {
        console.error('Error creating phone top-up:', error);
        return { success: false, error: error.message };
    }
}

// Update an existing phone top-up record
export async function updatePhoneTopUp(id: string, data: Partial<PhoneTopUpData>) {
    try {
        const topUp = await prisma.phoneTopUp.update({
            where: { id },
            data,
        });

        return { success: true, data: topUp };
    } catch (error: any) {
        console.error('Error updating phone top-up:', error);
        return { success: false, error: error.message };
    }
}

// Delete a phone top-up record
export async function deletePhoneTopUp(id: string) {
    try {
        await prisma.phoneTopUp.delete({
            where: { id },
        });

        return { success: true };
    } catch (error: any) {
        console.error('Error deleting phone top-up:', error);
        return { success: false, error: error.message };
    }
}

// Test database connection
export async function testDatabaseConnection() {
    try {
        const count = await prisma.phoneTopUp.count();
        return { success: true, count };
    } catch (error: any) {
        console.error('Database connection error:', error);
        return { success: false, error: error.message };
    }
}

// Force fix database schema
export async function fixDatabaseSchema() {
    try {
        // Raw SQL from migration file 003_phone_topups.sql
        await prisma.$executeRawUnsafe(`
            CREATE TABLE IF NOT EXISTS "phone_topups" (
                "id" TEXT NOT NULL,
                "phone_number" TEXT NOT NULL,
                "sim_card_id" INTEGER,
                "name" TEXT,
                "status" TEXT NOT NULL DEFAULT 'Active',
                "ws_status" TEXT,
                "topup_amount" TEXT NOT NULL DEFAULT 'RM5.00',
                "topup_date" TIMESTAMP(3),
                "renewal_date" TIMESTAMP(3),
                "price" TEXT NOT NULL DEFAULT 'RM 5.00',
                "notes" TEXT,
                "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP(3) NOT NULL,

                CONSTRAINT "phone_topups_pkey" PRIMARY KEY ("id")
            );
        `);

        await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "phone_topups_phone_number_key" ON "phone_topups"("phone_number");`);
        await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "phone_topups_status_idx" ON "phone_topups"("status");`);
        await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "phone_topups_ws_status_idx" ON "phone_topups"("ws_status");`);
        await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "phone_topups_renewal_date_idx" ON "phone_topups"("renewal_date");`);

        return { success: true };
    } catch (error: any) {
        console.error('Error fixing database schema:', error);
        return { success: false, error: error.message };
    }
}

// Generate CSV for Sheet Export
export async function generateCSVForSheet() {
    try {
        const topUps = await prisma.phoneTopUp.findMany({
            orderBy: { simCardId: 'asc' },
        });

        // Header matching the Google Sheet
        const header = ['Phone Number', 'Sim Card ID', 'Name', 'Status', 'WS Status', 'TopUp Amount', 'TopUp Date', 'Renewal Date', 'Price', 'Notes'];

        const rows = topUps.map(t => [
            t.phoneNumber,
            t.simCardId?.toString() || '',
            t.name || '',
            t.status,
            t.wsStatus || '',
            t.topUpAmount,
            t.topUpDate ? new Date(t.topUpDate).toLocaleDateString('en-GB') : '', // DD/MM/YYYY
            t.renewalDate ? new Date(t.renewalDate).toLocaleDateString('en-GB') : '',
            t.price,
            t.notes || ''
        ]);

        // Combine header and rows
        const csvContent = [
            header.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        return { success: true, data: csvContent };
    } catch (error: any) {
        console.error('Error generating CSV:', error);
        return { success: false, error: error.message };
    }
}

// Sync from Google Sheet
export async function syncPhoneTopUpsFromSheet() {
    try {
        const sheetUrl = 'https://docs.google.com/spreadsheets/d/1T6M9kZnIi_Y3W3G9ln-PR1Wqt3Ms8bbRflgrOrmuE5o/export?format=csv';

        console.log('Fetching CSV from Google Sheets...');
        const response = await fetch(sheetUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch sheet: ${response.statusText}`);
        }
        const csvText = await response.text();

        // Parse CSV
        const lines = csvText.split('\n').slice(4); // Skip header rows
        const records: PhoneTopUpData[] = [];

        for (const line of lines) {
            if (!line.trim()) continue;

            const columns = line.split(',');
            if (columns.length < 10) continue;

            const phoneNumber = columns[0]?.trim();
            if (!phoneNumber || phoneNumber === 'Total' || phoneNumber === 'Total Perlu Topup') break;

            // Parse dates (DD/MM/YYYY format)
            const parseDate = (dateStr: string) => {
                if (!dateStr || !dateStr.trim()) return null;
                const [day, month, year] = dateStr.trim().split('/');
                if (!day || !month || !year) return null;
                return new Date(`${year}-${month}-${day}`);
            };

            records.push({
                phoneNumber,
                simCardId: columns[1] ? parseInt(columns[1].trim()) : null,
                name: columns[2]?.trim() || null,
                status: columns[3]?.trim() || 'Active',
                wsStatus: columns[4]?.trim() || null,
                topUpAmount: columns[5]?.trim() || 'RM5.00',
                topUpDate: parseDate(columns[6]),
                renewalDate: parseDate(columns[7]),
                price: columns[8]?.trim() || 'RM 5.00',
                notes: columns[9]?.trim() || null,
            });
        }

        console.log(`Parsed ${records.length} records. Starting DB sync...`);

        // Upsert records in parallel batches to avoid timeouts
        let created = 0;
        let updated = 0;
        let errors = 0;

        // Process in batches of 10
        const BATCH_SIZE = 10;
        for (let i = 0; i < records.length; i += BATCH_SIZE) {
            const batch = records.slice(i, i + BATCH_SIZE);
            await Promise.all(batch.map(async (record) => {
                try {
                    const existing = await prisma.phoneTopUp.findUnique({
                        where: { phoneNumber: record.phoneNumber },
                    });

                    if (existing) {
                        await prisma.phoneTopUp.update({
                            where: { phoneNumber: record.phoneNumber },
                            data: record,
                        });
                        updated++;
                    } else {
                        await prisma.phoneTopUp.create({
                            data: record,
                        });
                        created++;
                    }
                } catch (error) {
                    console.error(`Error syncing record ${record.phoneNumber}:`, error);
                    errors++;
                }
            }));
        }

        return {
            success: true,
            data: { created, updated, errors, total: records.length },
        };
    } catch (error: any) {
        console.error('Error syncing from Google Sheet:', error);
        return { success: false, error: error.message };
    }
}
