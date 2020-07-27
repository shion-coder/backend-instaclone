export interface IValidator<T> {
  errors: T;
  isValid: boolean;
}
