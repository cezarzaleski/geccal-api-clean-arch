export class InvalidStatusBookError extends Error {
  constructor(message?: string) {
    super(message || 'Status of book invalid');
    this.name = 'InvalidStatusBookError';
  }
}

export default InvalidStatusBookError;
