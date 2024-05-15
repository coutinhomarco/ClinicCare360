/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "doctor_unique" ON "Doctor"("userId");
