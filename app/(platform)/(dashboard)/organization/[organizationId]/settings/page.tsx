import prisma from "@/lib/prisma";
import { unstable_cache as cache } from "next/cache";
import { SettingsForm } from "./_components/settings-form";

export default async function SettingsPage({
  params: { organizationId },
}: {
  params: { organizationId: string };
}) {
  const fetchSettings = cache(
    () => getSettings(organizationId),
    ["settings", organizationId],
    {
      tags: ["settings_" + organizationId],
    },
  );
  const settings = await fetchSettings();
  return (
    <div className="mx-auto flex flex-col  justify-center gap-8">
      <h1>Settings</h1>
      <SettingsForm
        orgId={organizationId}
        currency={settings?.currency}
        language={settings?.language}
      />
    </div>
  );
}

async function getSettings(orgId: string) {
  return await prisma.settings.findUnique({
    where: { orgId },
  });
}
