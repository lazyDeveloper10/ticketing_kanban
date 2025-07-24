-- CreateTable
CREATE TABLE "Tickets" (
    "id" TEXT NOT NULL,
    "ticketNumber" TEXT NOT NULL,
    "ticketTitle" TEXT NOT NULL,
    "ticketDescription" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "file1" TEXT,
    "file2" TEXT,
    "file3" TEXT,
    "activeFlag" BOOLEAN NOT NULL DEFAULT true,
    "ticketProgressId" TEXT NOT NULL,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket_Progress" (
    "id" TEXT NOT NULL,
    "ticketProgressName" TEXT NOT NULL,
    "ticketProgressCode" TEXT,
    "position" INTEGER NOT NULL,
    "theme" TEXT,
    "description" TEXT,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ticket_Progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketActivity" (
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "file1" TEXT,
    "file2" TEXT,
    "file3" TEXT,
    "ticketId" TEXT NOT NULL,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TicketActivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tickets_ticketNumber_key" ON "Tickets"("ticketNumber");

-- CreateIndex
CREATE INDEX "Tickets_id_ticketNumber_ticketTitle_ticketDescription_ticke_idx" ON "Tickets"("id", "ticketNumber", "ticketTitle", "ticketDescription", "ticketProgressId", "position", "file1", "file2", "file3", "createdBy", "updatedBy");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_Progress_ticketProgressName_key" ON "Ticket_Progress"("ticketProgressName");

-- CreateIndex
CREATE INDEX "Ticket_Progress_id_ticketProgressName_ticketProgressCode_po_idx" ON "Ticket_Progress"("id", "ticketProgressName", "ticketProgressCode", "position", "description", "createdBy", "updatedBy");

-- CreateIndex
CREATE UNIQUE INDEX "TicketActivity_activityId_key" ON "TicketActivity"("activityId");

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_ticketProgressId_fkey" FOREIGN KEY ("ticketProgressId") REFERENCES "Ticket_Progress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketActivity" ADD CONSTRAINT "TicketActivity_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
