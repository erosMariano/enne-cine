/*
  Warnings:

  - You are about to drop the column `duracao` on the `Filme` table. All the data in the column will be lost.
  - Added the required column `duracaoMin` to the `Filme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Filme" DROP COLUMN "duracao",
ADD COLUMN     "duracaoMin" INTEGER NOT NULL;
