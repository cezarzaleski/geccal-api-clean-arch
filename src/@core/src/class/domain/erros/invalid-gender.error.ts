export default class InvalidGenderError extends Error {
  constructor(message?: string) {
    super(message || 'Gender invalid');
    this.name = 'InvalidGenderError';
  }
}
