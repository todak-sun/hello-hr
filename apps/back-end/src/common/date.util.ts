import { LocalDate, LocalDateTime, convert, nativeJs } from "@js-joda/core";

export const toLocalDateTime = (date: Date) => nativeJs(date).toLocalDateTime();
export const toLocalDate = (date: Date) => nativeJs(date).toLocalDate();
export const toNativeJsDate = (date: LocalDate | LocalDateTime) =>
  convert(date).toDate();
