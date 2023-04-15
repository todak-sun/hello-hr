import { LocalDate } from "@js-joda/core";
import { ValueTransformer } from "typeorm";
import { toLocalDate, toNativeJsDate } from "./date.util";

export class LocalDateTransformer implements ValueTransformer {
  to(entityValue: LocalDate): Date {
    return toNativeJsDate(entityValue);
  }
  from(databaseValue: Date): LocalDate {
    return toLocalDate(databaseValue);
  }
}
