const required = (value) => (value ? undefined : "Required");
const email = (value) => (/\S+@\S+\.\S+/.test(value) ? undefined : "Invalid Email");
const minLength = (value) => (value.length < 3 ? "Length must be 3 or more characters" : undefined);
const maxLength = (value) => (value.length > 18 ? "Length cannot be more than 18 characters" : undefined);
const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce((error, validator) => error || validator(value), undefined);

export { required, email, minLength, maxLength, composeValidators };
