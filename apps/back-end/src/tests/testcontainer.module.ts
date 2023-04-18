import { Module } from "@nestjs/common";
import { testContainerProviders } from "./testcontainer.providers";

@Module({
  providers: testContainerProviders,
  exports: testContainerProviders,
})
export class TestContainerModule {}
