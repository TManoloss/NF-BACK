import { PrismaClient } from "@prisma/client";
import Logger from "../utils/logger";

const prisma = new PrismaClient();

class MaterialService {
  async listarMateriais() {
    Logger.info("Listando todos os materiais...");
    try {
      const materiais = await prisma.material.findMany({
        include: { fornecedor: true }, // Inclui detalhes do fornecedor
      });
      Logger.info(`Materiais encontrados: ${materiais.length}`);
      return materiais;
    } catch (error) {
      Logger.error("Erro ao listar materiais", error);
      throw error;
    }
  }

  async obterMaterialPorId(id: number) {
    Logger.info(`Buscando material com ID ${id}...`);
    try {
      const material = await prisma.material.findUnique({
        where: { id },
        include: { fornecedor: true },
      });
      if (!material) {
        Logger.warn(`Material com ID ${id} não encontrado.`);
      }
      return material;
    } catch (error) {
      Logger.error(`Erro ao buscar material com ID ${id}`, error);
      throw error;
    }
  }

  async criarMaterial(descricao: string, fornecedorId?: number) {
    Logger.info(`Criando material: ${descricao}...`);
    try {
      const material = await prisma.material.create({
        data: { descricao, fornecedor_id: fornecedorId },
      });
      Logger.info(`Material criado com ID ${material.id}`);
      return material;
    } catch (error) {
      Logger.error("Erro ao criar material", error);
      throw error;
    }
  }

  async atualizarMaterial(id: number, descricao: string, fornecedorId?: number) {
    Logger.info(`Atualizando material com ID ${id}...`);
    try {
      const material = await prisma.material.update({
        where: { id },
        data: { descricao, fornecedor_id: fornecedorId },
      });
      Logger.info(`Material atualizado: ID ${id}`);
      return material;
    } catch (error) {
      Logger.error(`Erro ao atualizar material com ID ${id}`, error);
      throw error;
    }
  }

  async deletarMaterial(id: number) {
    Logger.info(`Deletando material com ID ${id}...`);
    try {
      await prisma.material.delete({ where: { id } });
      Logger.info(`Material com ID ${id} deletado.`);
    } catch (error) {
      Logger.error(`Erro ao deletar material com ID ${id}`, error);
      throw error;
    }
  }
}

export default new MaterialService();
