-- CreateTable
CREATE TABLE "DeviceRecord" (
    "id" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "slaveId" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "totalDatabased" INTEGER NOT NULL,
    "product" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeviceRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeviceRecord_slaveId_key" ON "DeviceRecord"("slaveId");
