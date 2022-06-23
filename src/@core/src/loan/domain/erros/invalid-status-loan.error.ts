export default class InvalidStatusLoanError extends Error {
  constructor(message?: string) {
    super(message || 'Status of loan invalid');
    this.name = 'InvalidStatusLoanError';
  }
}
