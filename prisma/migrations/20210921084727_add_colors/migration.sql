-- AlterTable
ALTER TABLE "endpoints" ADD COLUMN     "color" JSONB;

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "isRead" TIMESTAMP(3),
ALTER COLUMN "metaData" DROP NOT NULL;
