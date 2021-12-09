export const required = (value: string): undefined | "Required" => (value ? undefined : "Required");
export const email = (value: string): undefined | "Invalid Email" => (/\S+@\S+\.\S+/.test(value) ? undefined : "Invalid Email");
export const minLength = (value: string): "Length must be 3 or more characters" | undefined => (value.length < 3 ? "Length must be 3 or more characters" : undefined);
export const maxLength = (value: string): "Length cannot be more than 18 characters" | undefined => (value.length > 18 ? "Length cannot be more than 18 characters" : undefined);
export const composeValidators =
  (...validators: ((value: string) => string | undefined)[]) =>
    (value: string): string | undefined =>
      validators.reduce((error: string | undefined, validator) => error || validator(value), undefined);
