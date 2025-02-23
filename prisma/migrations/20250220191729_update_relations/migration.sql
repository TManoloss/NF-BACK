/*
  Warnings:

  - The primary key for the `Cliente` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Cliente` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `produto_id` on the `Orcamento` table. All the data in the column will be lost.
  - Added the required column `endereco` to the `Orcamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orcamento_id` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Orcamento" DROP CONSTRAINT "Orcamento_produto_id_fkey";

-- AlterTable
ALTER TABLE "Cliente" DROP CONSTRAINT "Cliente_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Orcamento" DROP COLUMN "produto_id",
ADD COLUMN     "cliente_id" INTEGER,
ADD COLUMN     "endereco" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Produto" ADD COLUMN     "orcamento_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Orcamento" ADD CONSTRAINT "Orcamento_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_orcamento_id_fkey" FOREIGN KEY ("orcamento_id") REFERENCES "Orcamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
