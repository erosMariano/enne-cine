/*
  Warnings:

  - Added the required column `classificacao` to the `Filme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genero` to the `Filme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idioma` to the `Filme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lancamento` to the `Filme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Filme" ADD COLUMN     "classificacao" TEXT NOT NULL,
ADD COLUMN     "emCartaz" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "genero" TEXT NOT NULL,
ADD COLUMN     "idioma" TEXT NOT NULL,
ADD COLUMN     "lancamento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sessaoExtra" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "trailerUrl" TEXT;
