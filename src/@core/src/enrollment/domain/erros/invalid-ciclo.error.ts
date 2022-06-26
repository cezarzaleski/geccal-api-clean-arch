export class InvalidCicloError extends Error {
  constructor(message?: string) {
    super(message || 'Ciclo invalid');
    this.name = 'InvalidCicloError';
  }
}

export default InvalidCicloError;
