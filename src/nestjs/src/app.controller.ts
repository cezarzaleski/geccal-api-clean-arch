import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Livro } from '@geccal/core/dist/acervo/livro/domain';
import EditoraId from '@geccal/core/dist/acervo/livro/domain/entities/editora-id.vo';
import { Book } from '@geccal/core/dist/book/domain';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const props = {
      author: 'some author',
      createdAt: new Date(),
      edition: '1ª',
      exemplary: 1,
      isActive: true,
      origin: 'donation',
      publishingCompany: 'some publishing Company',
      name: 'book',
      description: 'some description',
    };
    const criadoEm = new Date();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const editoraId = new EditoraId().value;
    const autores = ['maria', 'pedro'];
    const origem = 'donation';
    const situacao = 'disponivel';
    const propsLivro = {
      autores: autores,
      criadoEm: criadoEm,
      edicao: '1ª',
      exemplar: 1,
      origem: origem,
      editoraId: editoraId,
      nome: 'livro',
      situacao: situacao,
      observacao: 'some description',
    };

    const livro = Livro.from(propsLivro);
    console.log(livro.nome);
    const book = new Book(props);

    return this.appService.getHello();
  }
}
