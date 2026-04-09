import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entities";

@Injectable()
export class CategoriaService {

    constructor(
        @InjectRepository(Categoria) // Diz ao Nest: "quando criar esse service, me dê um repositório da entidade Categoria"
        private categoriaRepository: Repository<Categoria>
    ) {}

    // mostrar todas as categoras
    async findAll(): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            relations: {
                produtos: true 
            }
        });
    }

        // mostrar as categorias por ID
    async findById(id: number): Promise<Categoria> {
        let categoria = await this.categoriaRepository.findOne({
            where: { id },
            relations: { produtos: true }
        });

        if (!categoria)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);

        return categoria;
    }

    // mostrar as categorias por nome
    async findAllByNome(nome: string): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations: {
                produtos: true
            }
        });
    }

    // criar categoria
    async create(categoria: Categoria): Promise<Categoria> {
        return await this.categoriaRepository.save(categoria);
    }

    // atualizar categoria
    async update(categoria: Categoria): Promise<Categoria> {
        await this.findById(categoria.id);
        return await this.categoriaRepository.save(categoria);
    }

    // deletar categoria
    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);
        return await this.categoriaRepository.delete(id);
    }
}
