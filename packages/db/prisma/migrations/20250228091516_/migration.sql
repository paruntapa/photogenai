/*
  Warnings:

  - The values [Other] on the enum `ModelTypeEnum` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `ethnicity` on the `Model` table. All the data in the column will be lost.
  - You are about to drop the `TrainingImages` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ethinicity` to the `Model` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Model` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipUrl` to the `Model` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prompt` to the `OutputImages` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ModelTrainingStatusEnum" AS ENUM ('Pending', 'Generated', 'Failed');

-- CreateEnum
CREATE TYPE "OutputImagesStatusEnum" AS ENUM ('Pending', 'Generated', 'Failed');

-- CreateEnum
CREATE TYPE "EthinicityEnum" AS ENUM ('White', 'Black', 'Asian_American', 'East_Asian', 'South_East_Asian', 'Middle_Eastern', 'Hispanic', 'Pacific', 'South_Asian');

-- AlterEnum
BEGIN;
CREATE TYPE "ModelTypeEnum_new" AS ENUM ('Man', 'Woman', 'Others');
ALTER TABLE "Model" ALTER COLUMN "type" TYPE "ModelTypeEnum_new" USING ("type"::text::"ModelTypeEnum_new");
ALTER TYPE "ModelTypeEnum" RENAME TO "ModelTypeEnum_old";
ALTER TYPE "ModelTypeEnum_new" RENAME TO "ModelTypeEnum";
DROP TYPE "ModelTypeEnum_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "TrainingImages" DROP CONSTRAINT "TrainingImages_modelId_fkey";

-- AlterTable
ALTER TABLE "Model" DROP COLUMN "ethnicity",
ADD COLUMN     "ethinicity" "EthinicityEnum" NOT NULL,
ADD COLUMN     "falAiRequestId" TEXT,
ADD COLUMN     "tensorPath" TEXT,
ADD COLUMN     "thumbnail" TEXT,
ADD COLUMN     "trainingStatus" "ModelTrainingStatusEnum" NOT NULL DEFAULT 'Pending',
ADD COLUMN     "triggerWord" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "zipUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OutputImages" ADD COLUMN     "falAiRequestId" TEXT,
ADD COLUMN     "prompt" TEXT NOT NULL,
ADD COLUMN     "status" "OutputImagesStatusEnum" NOT NULL DEFAULT 'Pending',
ALTER COLUMN "imageUrl" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Packs" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "imageUrl1" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "imageUrl2" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "TrainingImages";

-- DropEnum
DROP TYPE "EthnicityEnum";

-- CreateIndex
CREATE INDEX "Model_falAiRequestId_idx" ON "Model"("falAiRequestId");

-- CreateIndex
CREATE INDEX "OutputImages_falAiRequestId_idx" ON "OutputImages"("falAiRequestId");
