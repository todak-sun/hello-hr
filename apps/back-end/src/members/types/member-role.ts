export const MemberRole = {
  MEMBER: "MEMBER",
  SUPER: "SUPER",
} as const;

export type MemberRole = (typeof MemberRole)[keyof typeof MemberRole];
