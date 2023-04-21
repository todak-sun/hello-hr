import { MemberRole } from "@/members/types/member-role";

export interface CreateMemberCommand {
  username: string;
  password: string;
  role: MemberRole;
}
