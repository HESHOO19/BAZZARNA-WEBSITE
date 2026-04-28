import { UserManagement } from "@/components/dashboard/user-management";
import { getTeamMembers } from "@/lib/repositories";

export default async function DashboardUsersPage() {
  const members = await getTeamMembers();

  return <UserManagement initialUsers={members} />;
}

