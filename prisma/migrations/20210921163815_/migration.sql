/*
  Warnings:

  - Added the required column `dashboardId` to the `widgets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `widgets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "widgets" ADD COLUMN     "dashboardId" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "projectId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "widgets" ADD FOREIGN KEY ("dashboardId") REFERENCES "dashboards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
