import { compareValue, generateHashedValue } from "./bcrypt.util";

describe("bcrypt util test", () => {
  it("hash value test", async () => {
    // given
    const password = "it's password";

    // when
    const hashedValue = await generateHashedValue(password);

    // then
    expect(hashedValue).not.toBe(password);
  });

  it("compare test", async () => {
    // given
    const password = "it's password";
    const hashedValue = await generateHashedValue(password);

    // when
    const result = await compareValue(password, hashedValue);

    // then
    expect(result).toBeTruthy();
  });
});
