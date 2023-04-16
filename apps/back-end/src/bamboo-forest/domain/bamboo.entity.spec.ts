import { BambooEntity } from "./bamboo.entity";

describe("BambooEntity Test", () => {
  it("create test", () => {
    // given & when
    const bamboo = BambooEntity.create("휴가 늘려주세요", "휴가좀 주세요", "486");

    // then
    expect(bamboo).toBeDefined();
    expect(bamboo.title).toBe("휴가 늘려주세요");
    expect(bamboo.content).toBe("휴가좀 주세요");
    expect(bamboo.createdDateTime).toBeDefined();
    expect(bamboo.password).toBe("486");
  });
});
