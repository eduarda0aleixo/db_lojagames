import { IsNotEmpty, IsPositive, IsOptional, Min } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entities";

@Entity({ name: "tb_produtos" }) // Cria uma tabela no banco de dados
export class Produto {

    @PrimaryGeneratedColumn() 
    id!: number;

    @IsNotEmpty() 
    @Column({ length: 100, nullable: false })
    nome!: string;

    @IsNotEmpty()
    @IsPositive()
    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    preco!: number;

    @IsNotEmpty()
    @Column({ length: 500, nullable: true })
    descricao!: string;

    @IsNotEmpty()
    @Min(0)
    @Column({ nullable: false })
    quantidade!: number;

    @ManyToOne(() => Categoria, (categoria) => categoria.produtos, {
        onDelete: "CASCADE"
    })
    //personalizar o nome da coluna da Chave Estrangeira
    @JoinColumn({ name: "categoria_id" })
    categoria!: Categoria;
}