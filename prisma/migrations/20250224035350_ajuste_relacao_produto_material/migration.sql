-- CreateTable
CREATE TABLE "Material" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "fornecedor_id" INTEGER,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialProduto" (
    "id" SERIAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "materialId" INTEGER NOT NULL,

    CONSTRAINT "MaterialProduto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pendente',
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orcamento_id" INTEGER NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PedidoProduto" (
    "id" SERIAL NOT NULL,
    "pedidoId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "ordemServicoId" INTEGER,

    CONSTRAINT "PedidoProduto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrdemServico" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "numero_pedido" INTEGER NOT NULL,

    CONSTRAINT "OrdemServico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fornecedor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "Fornecedor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pedido_numero_key" ON "Pedido"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "Pedido_orcamento_id_key" ON "Pedido"("orcamento_id");

-- CreateIndex
CREATE UNIQUE INDEX "OrdemServico_numero_pedido_key" ON "OrdemServico"("numero_pedido");

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_email_key" ON "Fornecedor"("email");

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_fornecedor_id_fkey" FOREIGN KEY ("fornecedor_id") REFERENCES "Fornecedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialProduto" ADD CONSTRAINT "MaterialProduto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialProduto" ADD CONSTRAINT "MaterialProduto_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_orcamento_id_fkey" FOREIGN KEY ("orcamento_id") REFERENCES "Orcamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoProduto" ADD CONSTRAINT "PedidoProduto_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoProduto" ADD CONSTRAINT "PedidoProduto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoProduto" ADD CONSTRAINT "PedidoProduto_ordemServicoId_fkey" FOREIGN KEY ("ordemServicoId") REFERENCES "OrdemServico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdemServico" ADD CONSTRAINT "OrdemServico_numero_pedido_fkey" FOREIGN KEY ("numero_pedido") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
