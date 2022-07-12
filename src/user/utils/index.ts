import * as bcrypt from 'bcrypt';

export const encryptPassword = function (password: string): string {
  const securityLevel = 10;
  return bcrypt.hashSync(password, securityLevel);
};

export const matchPasswords = async function (
  plainPassword: string,
  hashPassword: string,
): Promise<boolean> {
  return bcrypt.compareSync(plainPassword, hashPassword);
};
