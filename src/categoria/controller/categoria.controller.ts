import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CategoriaService } from "../services/categoria.services";
import { Categoria } from "../entities/categoria.entities";

@Controller("/categorias")
export class CategoriaController{
    constructor(private readonly categoriaService: CategoriaService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]> {
        return this.categoriaService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
        return this.categoriaService.findById(id);
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome') nome: string): Promise<Categoria[]> {
        return this.categoriaService.findAllByNome(nome);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() categoria: Categoria): Promise<Categoria> {
        return await this.categoriaService.create(categoria);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    async update(@Body() categoria: Categoria): Promise<Categoria> {
        return await this.categoriaService.update(categoria);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.OK)  // ← mudar para 200
    async delete(@Param("id") id: number): Promise<{ message: string }> {
        await this.categoriaService.delete(id);
        return { message: `Categoria com ID ${id} foi deletada com sucesso!` };
    }
    

}