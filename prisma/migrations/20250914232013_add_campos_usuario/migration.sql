-- AlterTable
ALTER TABLE "public"."Usuario" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'cliente';
