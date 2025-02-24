/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `Fornecedor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnpj` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Fornecedor_email_key";

-- AlterTable
ALTER TABLE "Fornecedor" ADD COLUMN     "cnpj" TEXT NOT NULL,
ADD COLUMN     "endereco" TEXT,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_cnpj_key" ON "Fornecedor"("cnpj");
