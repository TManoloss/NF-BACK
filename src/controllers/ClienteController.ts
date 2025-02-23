import { Request, Response } from "express";
import { ClienteService } from "../services/ClienteService";

export class ClienteController {
    static async criarCliente(req: Request, res: Response) {
        try{
            const { nome, email, telefone, endereco, cpf } = req.body;
            const cliente = await ClienteService.criarCliente(nome, email, telefone, endereco, cpf);
            return res.status(201).json(cliente);
        } catch(error) {
            return res.status(500).json({ message: "Erro ao criar cliente", error});
        }
    }

    static async listarClientes(req: Request, res: Response){
        try {
            const clientes = await ClienteService.listarClientes();
            return res.status(200).json(clientes);
        }   catch (error) {
            return res.status(500).json({ message: "Erro ao listar clientes", error });
        }
    }

    static async buscarClientePorId(req: Request, res: Response) {
      try {
        const { id } = req.params;
  
        if (!id || isNaN(Number(id))) {
          return res.status(400).json({ message: "ID inválido" });
        }
  
        const cliente = await ClienteService.buscarClientePorId(Number(id));
  
        if (!cliente) {
          return res.status(404).json({ message: "Cliente não encontrado" });
        }
  
        return res.status(200).json(cliente);
      } catch (error) {
        console.error("Erro ao buscar cliente por ID:", error);
        return res.status(500).json({ message: "Erro ao buscar cliente por ID", error: (error as any).message });
      }
    }
    static async buscarClientePorNome(req: Request, res: Response) {
      try {
        const { nome } = req.query;
  
        if (!nome || typeof nome !== "string" || nome.trim() === "") {
          return res.status(400).json({ message: "Nome inválido" });
        }
  
        const clientes = await ClienteService.buscarClientePorNome(nome);
  
        if (!clientes || clientes.length === 0) {
          return res.status(404).json({ message: "Nenhum cliente encontrado com esse nome" });
        }
  
        return res.status(200).json(clientes);
      } catch (error) {
        console.error("Erro ao buscar cliente por nome:", error);
        return res.status(500).json({ message: "Erro ao buscar cliente por nome", error: (error as any).message });
      }
    }
      
    static async deletarCliente(req: Request, res: Response) {
        try {
          const { id } = req.params;
          await ClienteService.deletarCliente(id);
          return res.status(200).json({ message: "Cliente deletado com sucesso" });
        } catch (error) {
          return res.status(500).json({ message: "Erro ao deletar cliente", error });
        }
    }
}