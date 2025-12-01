import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const records = [
    { owner: "AISYAH", phone: "601158622365", company: "WEROCA", slaveId: "5353", deviceId: "\"\"\"''''''\\\\\\\\\\\\\\\\\\\\", totalDatabased: 2500, product: "VIGOMAX", status: "PAIRED", notes: "TIKTOK" },
    { owner: "AISYAH", phone: "601113082049", company: "WEROCA", slaveId: "3634", deviceId: "3897", totalDatabased: 3869, product: "VIGOMAX", status: "PAIRED", notes: "WEBSITE" },
    { owner: "AISYAH", phone: "60103318986", company: "WEROCA", slaveId: "3627", deviceId: "3857", totalDatabased: 4885, product: "VIGOMAX", status: "PAIRED", notes: "" },
    { owner: "AISYAH", phone: "60 1158513849", company: "WEROCA", slaveId: "4500", deviceId: "4735", totalDatabased: 1052, product: "VIGOMAX", status: "PAIRED", notes: "" },
    { owner: "AISYAH", phone: "60108687946", company: "WEROCA", slaveId: "4219", deviceId: "4466", totalDatabased: 1000, product: "VIGOMAX", status: "BANNED", notes: "" },
    { owner: "AISYAH", phone: "60108728679", company: "WEROCA", slaveId: "4846", deviceId: "5085", totalDatabased: 1000, product: "VIGOMAX", status: "BANNED", notes: "" },
    { owner: "AISYAH", phone: "60104601586", company: "WEROCA", slaveId: "4844", deviceId: "5083", totalDatabased: 1000, product: "VIGOMAX", status: "BANNED", notes: "" },
    { owner: "FATHIN", phone: "60148515818", company: "WEROCA", slaveId: "4871", deviceId: "5113", totalDatabased: 1000, product: "VIGOMAX", status: "PAIRED", notes: "60103319131" },
    { owner: "FATHIN", phone: "601159534852", company: "WEROCA", slaveId: "5091", deviceId: "5319", totalDatabased: 1000, product: "VIGOMAX", status: "PAIRED", notes: "" },
    { owner: "FATHIN", phone: "60134705118", company: "WEROCA", slaveId: "5089", deviceId: "5317", totalDatabased: 1000, product: "VIGOMAX", status: "PAIRED", notes: "" },
    { owner: "FATHIN", phone: "601158624765", company: "WEROCA", slaveId: "5201", deviceId: "5464", totalDatabased: 1000, product: "VIGOMAX", status: "PAIRED", notes: "601119435220" },
    { owner: "FATHIN", phone: "601158529768", company: "WEROCA", slaveId: "4783", deviceId: "5036", totalDatabased: 1000, product: "VIGOMAX", status: "PAIRED", notes: "" },
    { owner: "FATHIN", phone: "60102188102", company: "WEROCA", slaveId: "5068", deviceId: "5297", totalDatabased: 1000, product: "VIGOMAX", status: "PAIRED", notes: "" },
    { owner: "FATHIN", phone: "601158529541", company: "WEROCA", slaveId: "5203", deviceId: "5466", totalDatabased: 1000, product: "VIGOMAX", status: "PAIRED", notes: "" },
    { owner: "FATHIN", phone: "60108283528", company: "WEROCA", slaveId: "5038", deviceId: "5276", totalDatabased: 1000, product: "VIGOMAX", status: "PAIRED", notes: "" },
    { owner: "SYAMIRA", phone: "60149081003", company: "WEROCA", slaveId: "4874", deviceId: "5109", totalDatabased: 1000, product: "VIGOMAX", status: "PERMANENT BAN", notes: "" },
    { owner: "SYAMIRA", phone: "601126714600", company: "WEROCA", slaveId: "5077", deviceId: "5306", totalDatabased: 1000, product: "VIGOMAX", status: "PAIRED", notes: "601129275818" },
    { owner: "SYAMIRA", phone: "60148030089", company: "WEROCA", slaveId: "5158", deviceId: "5414", totalDatabased: 1000, product: "VIGOMAX", status: "PAIRED", notes: "" },
    { owner: "SYAMIRA", phone: "601156798951", company: "WEROCA", slaveId: "5202", deviceId: "3572", totalDatabased: 1000, product: "VIGOMAX", status: "PAIRED", notes: "601159565864" },
    { owner: "SYAMIRA", phone: "601157597915", company: "WEROCA", slaveId: "4904", deviceId: "5149", totalDatabased: 0, product: "VIGOMAX", status: "PAIRED", notes: "" },
    { owner: "AISYAH HW", phone: "601151123206", company: "HIM WELLNESS", slaveId: "6378", deviceId: "6499", totalDatabased: 3500, product: "HIMCOFFEE", status: "PAIRED", notes: "" },
    { owner: "AISYAH HW", phone: "60179585631", company: "HIM WELLNESS", slaveId: "6379", deviceId: "6500", totalDatabased: 3500, product: "HIMCOFFEE", status: "PAIRED", notes: "" },
    { owner: "AISYAH HW", phone: "60179142381", company: "HIM WELLNESS", slaveId: "6380", deviceId: "6501", totalDatabased: 3500, product: "HIMCOFFEE", status: "PAIRED", notes: "" },
    { owner: "PINUK", phone: "601156559473", company: "HIM WELLNESS", slaveId: "6382", deviceId: "6502", totalDatabased: 3500, product: "HIMCOFFEE", status: "PAIRED", notes: "" },
    { owner: "PINUK", phone: "601157815316", company: "HIM WELLNESS", slaveId: "6383", deviceId: "6503", totalDatabased: 4197, product: "SPRAY UP", status: "PAIRED", notes: "tukar No" },
    { owner: "PINUK", phone: "601156558432", company: "HIM WELLNESS", slaveId: "6389", deviceId: "6512", totalDatabased: 3500, product: "SPRAY UP", status: "PAIRED", notes: "" },
    { owner: "ADILAH", phone: "60179135481", company: "HIM WELLNESS", slaveId: "6384", deviceId: "6507", totalDatabased: 3500, product: "SPRAY UP", status: "PAIRED", notes: "" },
    { owner: "ADILAH", phone: "60179640519", company: "HIM WELLNESS", slaveId: "6385", deviceId: "6508", totalDatabased: 3500, product: "SPRAY UP", status: "PAIRED", notes: "" },
    { owner: "ADILAH", phone: "601116691927", company: "HIM WELLNESS", slaveId: "6386", deviceId: "6509", totalDatabased: 3500, product: "SPRAY UP", status: "PAIRED", notes: "" },
    { owner: "NAZIRA", phone: "601156554092", company: "HIM WELLNESS", slaveId: "6387", deviceId: "6510", totalDatabased: 3500, product: "SPRAY UP", status: "PAIRED", notes: "" },
    { owner: "NAZIRA", phone: "601156558897", company: "HIM WELLNESS", slaveId: "6388", deviceId: "6511", totalDatabased: 3500, product: "SPRAY UP", status: "PAIRED", notes: "" },
    { owner: "NAZIRA", phone: "60179327935", company: "HIM WELLNESS", slaveId: "6390", deviceId: "6513", totalDatabased: 5739, product: "SPRAY UP", status: "PAIRED", notes: "" },
    { owner: "AIDA", phone: "60172879203", company: "SDN", slaveId: "6391", deviceId: "6514", totalDatabased: 2769, product: "HIMCOFFEE", status: "PAIRED", notes: "" },
    { owner: "AIDA", phone: "60172885830", company: "SDN", slaveId: "6392", deviceId: "6515", totalDatabased: 3000, product: "SPRAY UP", status: "PAIRED", notes: "" },
    { owner: "AIDA", phone: "60172879203", company: "SDN", slaveId: "6394", deviceId: "6516", totalDatabased: 2646, product: "SPRAY UP", status: "PAIRED", notes: "" },
];

async function importRecords() {
    console.log('Starting import...');
    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    for (const record of records) {
        try {
            await prisma.deviceRecord.create({
                data: record,
            });
            successCount++;
            console.log(`✓ Imported: ${record.owner} - ${record.slaveId}`);
        } catch (error: any) {
            errorCount++;
            const errorMsg = `✗ Failed: ${record.owner} - ${record.slaveId}: ${error.message}`;
            errors.push(errorMsg);
            console.error(errorMsg);
        }
    }

    console.log('\n=== Import Summary ===');
    console.log(`Total records: ${records.length}`);
    console.log(`Successfully imported: ${successCount}`);
    console.log(`Failed: ${errorCount}`);

    if (errors.length > 0) {
        console.log('\nErrors:');
        errors.forEach(err => console.log(err));
    }

    await prisma.$disconnect();
}

importRecords();
