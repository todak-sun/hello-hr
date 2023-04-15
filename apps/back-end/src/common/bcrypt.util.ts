import * as bcrypt from "bcryptjs";

export async function generateHashedValue(value: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(value, salt);
}

export async function compareValue(
  value: string,
  hashedValue: string,
): Promise<boolean> {
  return await bcrypt.compare(value, hashedValue);
}
