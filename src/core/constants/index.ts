export const HOST_APP_BACKOFFICE = process.env.HOST_APP_BACKOFFICE;
export const HOST_APP_COMPANY = process.env.HOST_APP_COMPANY;
export const HOST_APP_ACCOUNT_HOLDER = process.env.HOST_APP_ACCOUNT_HOLDER;

const prefixError = 'Ops!';
export const APP_UUID_VERSION = '4';
export const APP_MAX_AMOUNT = 2147483647;

export const MessagesValidations = {
  INTERNAL_ERROR: `${prefixError} algo deu errado`,
  UNAUTHORIZED: `${prefixError} você não está autenticado`,
  CONFLICT: `${prefixError} há dados em conflito`,
  BAD_REQUEST: `${prefixError} requisição mal formatada`,
  FORBIDDEN: `${prefixError} você não tem permissão para acessar este recurso`,
  NOT_FOUND: `${prefixError} recurso não encontrado`,

  uuid: (field: string) =>
    `${prefixError} O campo ${field} deve um UUID válido`,
  string: (field: string) =>
    `${prefixError} o campo ${field} deve ser uma string`,
  isNotBlank: (field: string) =>
    `${prefixError} você esqueceu de informar o campo ${field}`,
  email: (field = 'email') => `${prefixError} este ${field} não parece certo`,
  cnpj: (field = 'CNPJ') => `${prefixError} este ${field} não parece certo`,
  cpf: (field = 'CPF') => `${prefixError} este ${field} não parece certo`,
  minLength: (field: string) =>
    `${prefixError} o campo ${field} está muito curto, informe pelo menos $constraint1 caracteres`,
  maxLength: (field: string) =>
    `${prefixError} o campo ${field} está muito longo, informe no máximo $constraint1 caracteres`,
  minAndMaxLength: (field: string) =>
    `${prefixError} O campo ${field} deve ter no mínimo $constraint1 e máximo de $constraint2 caracteres`,
  object: (field: string) =>
    `${prefixError} O campo ${field} deve ser um objeto`,
  array: (field: string) => `${prefixError} O campo ${field} deve ser um array`,
  arrayMinSize: (field: string) =>
    `${prefixError} O campo ${field} deve ter no mínimo $constraint1 item`,
  arrayMaxSize: (field: string) =>
    `${prefixError} O campo ${field} deve ter no máximo $constraint1 items`,
  notEmptyObject: (field: string) =>
    `${prefixError} O campo ${field} não pode ser vazio`,
  dateString: (field: string) =>
    `${prefixError} O campo ${field} está com uma data inválida`,
  boolean: (field: string) =>
    `${prefixError} O campo ${field} dever ser verdadeiro ou falso`,
  isFirstName: (field: string) =>
    `${prefixError} O campo ${field} dever conter apenas o primeiro nome`,
  isInt: (field: string) =>
    `${prefixError} O campo ${field} dever ser um número inteiro`,
  isPositive: (field: string) =>
    `${prefixError} O campo ${field} dever ser um número positivo`,
  minValue: (field: string) =>
    `${prefixError} O campo ${field} dever ser maior ou igual a $constraint1`,
  isPhoneNumber: (field: string) =>
    `${prefixError} O campo ${field} dever ser um número válido`,
  isEnum: (field: string) =>
    `${prefixError} O campo ${field} dever ser um valor válido`,
  match: (field: string, pattern = '') =>
    `${prefixError} O campo ${field} não está de acordo com o padrão ${pattern}`.trim(),
};

export const Query = {
  FIRST_PAGE: 1,
  MAX_LIMIT_PER_PAGE: 100,
  MIN_LIMIT_PER_PAGE: 25,
};
