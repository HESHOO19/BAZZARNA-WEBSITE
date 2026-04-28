import { TalentApplicationsBoard } from "@/components/dashboard/talent-applications-board";
import { getTalentApplications } from "@/lib/repositories";

export default async function DashboardTalentPage() {
  const applications = await getTalentApplications();

  return <TalentApplicationsBoard initialApplications={applications} />;
}

