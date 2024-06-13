import prisma from "@/lib/prisma";
import { unstable_cache as cache } from "next/cache";
import { SettingsForm } from "./_components/settings-form";
import { OrgId } from "@/types/Id";
import { db } from "@/drizzle/db";
import { settingsTable } from "@/drizzle/schema";

export default async function SettingsPage({
  params: { organizationId },
}: {
  params: { organizationId: OrgId };
}) {
  const fetchSettings = cache(
    async () => await getSettings(organizationId),
    [`settings_${organizationId}`],
  );
  const { currency, language } = await getSettings(organizationId);
  console.log("currency", currency);
  return (
    <div className="mx-auto flex flex-col  justify-center gap-8">
      <h1>Settings</h1>
      <SettingsForm
        orgId={organizationId}
        currency={currency}
        language={language}
      />
    </div>
  );
}

async function getSettings(orgId: OrgId) {
  const settings = await db.select().from(settingsTable);
  console.log("settings", settings);
  const result = settings.find((s) => s.orgId === orgId);
  return result ?? { currency: null, language: null };
}
