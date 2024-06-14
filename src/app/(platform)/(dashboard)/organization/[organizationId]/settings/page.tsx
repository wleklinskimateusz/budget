import { SettingsForm } from "./_components/settings-form";
import { OrgId } from "@/types/Id";

export default async function SettingsPage({
  params: { organizationId },
}: {
  params: { organizationId: OrgId };
}) {
  return (
    <div className="mx-auto flex flex-col  justify-center gap-8">
      <h1>Settings</h1>
      <SettingsForm orgId={organizationId} />
    </div>
  );
}
