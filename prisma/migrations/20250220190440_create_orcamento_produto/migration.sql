-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "servico" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 0,
    "categoria" TEXT,
    "status" TEXT,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orcamento" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "servico" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 0,
    "data_vencimento" TIMESTAMP(3),
    "produto_id" INTEGER NOT NULL,

    CONSTRAINT "Orcamento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Orcamento" ADD CONSTRAINT "Orcamento_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
