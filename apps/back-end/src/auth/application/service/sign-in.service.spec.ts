import { ConfigModule, ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";

describe("sign-in.service test", () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ".env",
        }),
      ],
      providers: [ConfigService],
      exports: [ConfigService],
    }).compile();
  });

  afterAll(async () => {
    await module.close();
  });

  it(`configServiceGet`, () => {
    const configService: ConfigService = module.get(ConfigService);
    const key = configService.get("RSA_PUBLIC_KEY");
    console.log(key);
  });
});
