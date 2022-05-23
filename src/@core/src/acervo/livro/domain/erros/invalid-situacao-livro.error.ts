export class InvalidSituacaoLivroError extends Error {
  constructor(message?: string) {
    super(message || 'Situação do livro inválida');
    this.name = 'InvalidSituacaoLivroError';
  }
}

export default InvalidSituacaoLivroError;
