/*
  Warnings:

  - A unique constraint covering the columns `[resourceId,resourceType]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Conversation_resourceId_resourceType_key" ON "Conversation"("resourceId", "resourceType");
