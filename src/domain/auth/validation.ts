const validationErrors: {
  [key: string]: Function;
} = {
  required: () => "Este campo é obrigatório, Insira um valor",
  minLength: ({ actualLength, requiredLength }: { actualLength: number; requiredLength: number }) =>
    `Este campo deve conter no mínimo ${requiredLength} caracteres. Você inseriu ${actualLength}.`,
  maxLength: ({ actualLength, requiredLength }: { actualLength: number; requiredLength: number }) =>
    `Este campo deve conter no máximo ${requiredLength} caracteres. Você inseriu ${actualLength}.`,
  email: () => "Por favor, insira um email válido",
  onlyCharacters: () => "O nome deve conter apenas letras",
  oneSpecialCharacter: () => "A senha deve conter pelo menos um caractere especial",
  oneUpperCase: () => "A senha deve conter pelo menos uma letra maiúscula",
  oneNumber: () => "A senha deve conter pelo menos um número",
  passwordMatch: () => "As senhas não coincidem",
};

declare global {
  interface HTMLInputElement {
    addValidation(callback: ValidatorsFn | ValidatorsFn[]): void;
  }
}

HTMLInputElement.prototype.addValidation = function (callback: ValidatorsFn | ValidatorsFn[], errorSelector = ".error-message") {
  let errorMessage: string;
  this.addEventListener("input", () => {
    errorMessage = "";

    if (callback instanceof Array) {
      const messages = callback
        .map((validation) => {
          return validation(this);
        })
        .filter(Boolean);
      errorMessage = messages[0];
    } else {
      errorMessage = callback(this);
    }

    this.setCustomValidity(errorMessage || "");

    const errorMessage$ = this.parentElement.querySelector(errorSelector);
    if (errorMessage$) errorMessage$.innerHTML = errorMessage ?? "";
  });
};

export type ValidatorsFn = (param: HTMLInputElement) => string;
export class Validators {
  public static readonly passwordMatch: (matchInput: HTMLInputElement) => ValidatorsFn = (matchInput: HTMLInputElement) => {
    return (input: HTMLInputElement) => {
      if (input.value != matchInput.value) return validationErrors.passwordMatch();
    };
  };

  public static readonly lengthValidator: (type: "min" | "max", length: number) => ValidatorsFn = (type, length) => {
    return (input: HTMLInputElement) => {
      input.setAttribute(type === "min" ? "minlength" : "maxlength", length.toString());

      const actualLength = input.value.length;
      if ((type === "min" && actualLength < length) || (type === "max" && actualLength > length)) {
        return validationErrors[type === "min" ? "minLength" : "maxLength"]({
          actualLength,
          requiredLength: length,
        });
      }
    };
  };

  public static readonly onlyCharacters: ValidatorsFn = (input: HTMLInputElement) => {
    if (!/^[\p{L}\s.'-]+$/u.test(input.value)) return validationErrors.onlyCharacters();
  };

  public static readonly email: ValidatorsFn = (input: HTMLInputElement) => {
    const re = /\S+@\S+\.\S+/;
    if (!re.test(input.value)) return validationErrors.email();
  };

  public static readonly required: ValidatorsFn = (input: HTMLInputElement) => {
    if (!input.value) return validationErrors.required();
  };

  public static readonly password: ValidatorsFn = (input: HTMLInputElement) => {
    if (!/[A-Z]/.test(input.value)) return validationErrors.oneUpperCase();
    if (!/\d/.test(input.value)) return validationErrors.oneNumber();
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(input.value)) return validationErrors.oneSpecialCharacter();
  };
}
