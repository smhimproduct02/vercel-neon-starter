'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createDeviceRecord(formData: FormData) {
    const owner = formData.get('owner') as string;
    const phone = formData.get('phone') as string;
    const company = formData.get('company') as string;
    const slaveId = formData.get('slaveId') as string;
    const deviceId = formData.get('deviceId') as string;
    const totalDatabased = parseInt(formData.get('totalDatabased') as string);
    const product = formData.get('product') as string;
    const status = formData.get('status') as string;
    const notes = formData.get('notes') as string;

    try {
        await prisma.deviceRecord.create({
            data: {
                owner,
                phone,
                company,
                slaveId,
                deviceId,
                totalDatabased,
                product,
                status,
                notes,
            },
        });
        revalidatePath('/dashboard');
        return { success: true };
    } catch (error) {
        console.error('Failed to create record:', error);
        return { success: false, error: 'Failed to create record. Slave ID might be duplicate.' };
    }
}

export async function getDeviceRecords() {
    try {
        console.log('Fetching device records...');
        const records = await prisma.deviceRecord.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        console.log(`Fetched ${records.length} records`);
        return { success: true, data: records };
    } catch (error) {
        console.error('Failed to fetch records:', error);
        return { success: false, error: 'Failed to fetch records' };
    }
}

export async function getDeviceRecord(id: string) {
    try {
        const record = await prisma.deviceRecord.findUnique({
            where: { id },
        });
        if (!record) {
            return { success: false, error: 'Record not found' };
        }
        return { success: true, data: record };
    } catch (error) {
        console.error('Failed to fetch record:', error);
        return { success: false, error: 'Failed to fetch record' };
    }
}

export async function updateDeviceRecord(id: string, formData: FormData) {
    const owner = formData.get('owner') as string;
    const phone = formData.get('phone') as string;
    const company = formData.get('company') as string;
    const slaveId = formData.get('slaveId') as string;
    const deviceId = formData.get('deviceId') as string;
    const totalDatabased = parseInt(formData.get('totalDatabased') as string);
    const product = formData.get('product') as string;
    const status = formData.get('status') as string;
    const notes = formData.get('notes') as string;

    try {
        await prisma.deviceRecord.update({
            where: { id },
            data: {
                owner,
                phone,
                company,
                slaveId,
                deviceId,
                totalDatabased,
                product,
                status,
                notes,
            },
        });
        revalidatePath('/dashboard');
        return { success: true };
    } catch (error) {
        console.error('Failed to update record:', error);
        return { success: false, error: 'Failed to update record. Slave ID might be duplicate.' };
    }
}

export async function deleteDeviceRecord(id: string) {
    try {
        await prisma.deviceRecord.delete({
            where: { id },
        });
        revalidatePath('/dashboard');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete record:', error);
        return { success: false, error: 'Failed to delete record' };
    }
}

export async function getDashboardStats() {
    try {
        console.log('Fetching dashboard stats...');
        const records = await prisma.deviceRecord.findMany();
        console.log(`Stats: Fetched ${records.length} records`);

        const totalRecords = records.length;
        const pairedCount = records.filter(r => r.status === 'PAIRED').length;
        const bannedCount = records.filter(r => r.status.includes('BAN')).length;

        // Product distribution
        const productCount: Record<string, number> = {};
        records.forEach(r => {
            productCount[r.product] = (productCount[r.product] || 0) + 1;
        });

        // Owner distribution
        const ownerCount: Record<string, number> = {};
        records.forEach(r => {
            ownerCount[r.owner] = (ownerCount[r.owner] || 0) + 1;
        });

        // Recent records (last 5)
        const recentRecords = records
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice(0, 5);

        return {
            success: true,
            data: {
                totalRecords,
                pairedCount,
                bannedCount,
                productCount,
                ownerCount,
                recentRecords,
            },
        };
    } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
        return { success: false, error: 'Failed to fetch dashboard stats' };
    }
}

function parseCSVRow(row: string): string[] {
    const columns: string[] = [];
    let current = '';
    let inQuote = false;

    for (let i = 0; i < row.length; i++) {
        const char = row[i];

        if (inQuote) {
            if (char === '"') {
                // Check for escaped quote
                if (i + 1 < row.length && row[i + 1] === '"') {
                    current += '"';
                    i++; // Skip next quote
                } else {
                    inQuote = false;
                }
            } else {
                current += char;
            }
        } else {
            if (char === '"') {
                inQuote = true;
            } else if (char === ',') {
                columns.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
    }
    columns.push(current.trim());
    return columns;
}

export async function syncFromGoogleSheets() {
    try {
        console.log('Starting Google Sheets sync...');

        // Fetch CSV from Google Sheets
        const sheetUrl = 'https://docs.google.com/spreadsheets/d/1L8QhsQ6_dWETGjJPivWOOmAFmfbt2HM_6BRK9yDHa80/export?format=csv&gid=0';
        const response = await fetch(sheetUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch sheet: ${response.status} ${response.statusText}`);
        }

        const csvText = await response.text();
        console.log('CSV fetched, length:', csvText.length);

        // Parse CSV (skip header row)
        const lines = csvText.trim().split('\n');
        const dataRows = lines.slice(1); // Skip header
        console.log('Rows to process:', dataRows.length);

        let created = 0;
        let updated = 0;
        let errors = 0;
        const errorMessages: string[] = [];

        for (const row of dataRows) {
            try {
                // Parse CSV row using robust parser
                const columns = parseCSVRow(row);

                if (columns.length < 4) {
                    console.warn('Skipping invalid row (not enough columns):', row);
                    continue;
                }

                const [owner, phone, company, slaveId, deviceId, totalDatabasedStr, product, status, notes] = columns;

                if (!slaveId || !owner) {
                    console.warn('Skipping row missing slaveId or owner:', row);
                    continue;
                }

                // Check if record exists
                const existing = await prisma.deviceRecord.findUnique({
                    where: { slaveId },
                });

                const totalDatabased = parseInt(totalDatabasedStr) || 0;

                const recordData = {
                    owner,
                    phone: phone || '',
                    company: company || '',
                    slaveId,
                    deviceId: deviceId || '',
                    totalDatabased,
                    product: product || '',
                    status: status || '',
                    notes: notes || null,
                };

                if (existing) {
                    // Update existing record
                    await prisma.deviceRecord.update({
                        where: { slaveId },
                        data: recordData,
                    });
                    updated++;
                } else {
                    // Create new record
                    await prisma.deviceRecord.create({
                        data: recordData,
                    });
                    created++;
                }
            } catch (rowError: any) {
                console.error('Error processing row:', row, rowError);
                errors++;
                errorMessages.push(`Row error: ${rowError.message}`);
            }
        }

        console.log(`Sync complete. Created: ${created}, Updated: ${updated}, Errors: ${errors}`);

        revalidatePath('/dashboard');
        revalidatePath('/dashboard/records');

        return {
            success: true,
            data: {
                created,
                updated,
                errors,
                total: dataRows.length,
                errorMessages: errorMessages.slice(0, 5), // First 5 errors only
            },
        };
    } catch (error: any) {
        console.error('Failed to sync from Google Sheets:', error);
        return { success: false, error: error.message || 'Failed to sync from Google Sheets' };
    }
}
