import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';
import { Categoria } from './categoria/entities/categoria.entities';
import { Produto } from './produto/entities/produto.entities';
import { ProdutoModule } from './produto/produto.module';

@Module({
  imports: [
    // conexão com o banco de dados
    TypeOrmModule.forRoot({
      type: 'mysql', // tipo do bd
      host: 'localhost', // local do bd
      port: 3306, // porta do bd
      username: 'root', // usarname do bd
      password: 'root', // a senha do bd
      database: 'db_lojagames', // nome do bd
      entities: [Categoria, Produto],
      synchronize: true,
      logging: true,
    }),
    CategoriaModule,
    ProdutoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
