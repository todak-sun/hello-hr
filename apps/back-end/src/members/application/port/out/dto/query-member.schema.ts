import { MemberRole } from "@/members/types/member-role";
import { LocalDateTime } from "@js-joda/core";

export interface QueryMemberSchema {
  id: number;
  username: string;
  roles: MemberRole[];
  signedUpAt: LocalDateTime;
}
