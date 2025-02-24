/*
  Warnings:

  - Added the required column `quantidade` to the `MaterialProduto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MaterialProduto" ADD COLUMN     "quantidade" INTEGER NOT NULL;
