import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EditoraId, Book } from '@geccal/core/dist/collection/domain';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
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

    const livro = Book.from(propsLivro);
    console.log(livro.nome);

    return this.appService.getHello();
  }
}
