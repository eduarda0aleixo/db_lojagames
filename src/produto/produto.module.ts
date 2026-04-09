import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Produto } from "./entities/produto.entities";
import { ProdutoService } from "./services/produto.services";
import { ProdutoController } from "./controller/produto.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Produto])],
    providers: [ProdutoService],
    controllers: [ProdutoController],
    exports: [TypeOrmModule],
})
export class ProdutoModule {}