import type { OrgPageProps } from "../org-page-props";
import { SettingsForm } from "./_components/settings-form";
export default async function SettingsPage({
  params: { organizationId },
}: OrgPageProps) {
  return (
    <div className="mx-auto flex flex-col  justify-center gap-8">
      <h1>Settings</h1>
      <SettingsForm orgId={organizationId} />
    </div>
  );
}
