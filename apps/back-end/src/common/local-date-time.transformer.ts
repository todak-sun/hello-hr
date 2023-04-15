import { LocalDateTime } from "@js-joda/core";
import { ValueTransformer } from "typeorm";
import { toLocalDateTime, toNativeJsDate } from "./date.util";

export class LocalDateTimeTransformer implements ValueTransformer {
  to(entityValue: LocalDateTime): Date {
    return toNativeJsDate(entityValue);
  }
  from(databaseValue: Date): LocalDateTime {
    return toLocalDateTime(databaseValue);
  }
}
