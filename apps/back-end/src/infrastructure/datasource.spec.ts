import { validationSchema } from "@/configuration/config";
import { postgresqlDataSource } from "@/infrastructure/datasource";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { DataSource } from "typeorm";

describe("datasource test", () => {
  let dataSource: DataSource;

  beforeAll(async () => {
    console.log(`BEFORE ALL...`);
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: [".env"],
          validationSchema: validationSchema,
        }),
      ],
      providers: [
        {
          provide: DataSource,
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
            return await postgresqlDataSource(configService);
          },
        },
      ],
      exports: [DataSource],
    }).compile();

    dataSource = module.get(DataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it("datasource 가 초기화 되었는지 확인", async () => {
    expect(dataSource).toBeDefined();
    const ret = await dataSource.query("select now();");
    console.log(ret);
  });
});
