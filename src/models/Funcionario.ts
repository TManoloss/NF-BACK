export class Funcionario{
    id?: number;
    nome: string;
    email:string;
    endereco: string;
    telefone: string;
    cpf: string;
    senha: string;

    constructor(
        nome: string,
        email: string,
        endereco: string,
        telefone: string,
        cpf: string,
        senha:string
    ){
        this.nome = nome;
        this.email = email;
        this.endereco = endereco;
        this.telefone = telefone;
        this.cpf = cpf;
        this.senha = senha;
    }
}