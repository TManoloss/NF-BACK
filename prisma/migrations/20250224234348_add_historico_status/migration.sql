-- AlterTable
ALTER TABLE "PedidoProduto" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Pendente';

-- CreateTable
CREATE TABLE "HistoricoStatusProduto" (
    "id" SERIAL NOT NULL,
    "pedidoProdutoId" INTEGER NOT NULL,
    "funcionarioId" INTEGER NOT NULL,
    "statusAnterior" TEXT NOT NULL,
    "statusNovo" TEXT NOT NULL,
    "dataAlteracao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistoricoStatusProduto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HistoricoStatusProduto" ADD CONSTRAINT "HistoricoStatusProduto_pedidoProdutoId_fkey" FOREIGN KEY ("pedidoProdutoId") REFERENCES "PedidoProduto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoStatusProduto" ADD CONSTRAINT "HistoricoStatusProduto_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
