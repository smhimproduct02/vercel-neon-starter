-- CreateTable
CREATE TABLE "phone_topups" (
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

-- CreateIndex
CREATE UNIQUE INDEX "phone_topups_phone_number_key" ON "phone_topups"("phone_number");

-- CreateIndex
CREATE INDEX "phone_topups_status_idx" ON "phone_topups"("status");

-- CreateIndex
CREATE INDEX "phone_topups_ws_status_idx" ON "phone_topups"("ws_status");

-- CreateIndex
CREATE INDEX "phone_topups_renewal_date_idx" ON "phone_topups"("renewal_date");
