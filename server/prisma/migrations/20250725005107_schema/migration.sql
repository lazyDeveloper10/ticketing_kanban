/*
  Warnings:

  - You are about to drop the column `activityId` on the `TicketActivity` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[activityNumber]` on the table `TicketActivity` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `activityNumber` to the `TicketActivity` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "TicketActivity_activityId_key";

-- AlterTable
ALTER TABLE "TicketActivity" DROP COLUMN "activityId",
ADD COLUMN     "activityNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TicketActivity_activityNumber_key" ON "TicketActivity"("activityNumber");
