import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entities";

@Injectable()
export class ProdutoService{

    constructor(
        @InjectRepository(Produto) // Diz ao Nest: "quando criar esse service, me dê um repositório da entidade Produto"
        private produtoRepository: Repository<Produto>
    ) { }

    // mostrar todos os produtos
    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            relations: {
                categoria: true  // Carrega a categoria junto
            }
        });
    }

    //  mostrar produto por ID
    async findById(id: number): Promise<Produto> {
        let produto = await this.produtoRepository.findOne({
            where: { id },
            relations: { categoria: true }
        });

        if (!produto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return produto;
    }

    // mostrar produtos por nome (busca parcial)
    async findAllByNome(nome: string): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations: {
                categoria: true
            }
        });
    }

    // criar produto
    async create(produto: Produto): Promise<Produto> {
        return await this.produtoRepository.save(produto);
    }

    // atualizar produto
    async update(produto: Produto): Promise<Produto> {
        await this.findById(produto.id);
        return await this.produtoRepository.save(produto);
    }

    // deletar produto
    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);
        return await this.produtoRepository.delete(id);
    }


}