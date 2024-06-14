"use client";
import { Label } from "@/components/ui/label";
import { mutateSettings } from "../_actions/mutateSettings";
import { upsertSettings } from "../_actions/upsertSettings";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";
import type { OrgId } from "@/types/Id";
import { useMutation, useQuery } from "@tanstack/react-query";
import { currencyValues, languageValues } from "@/drizzle/schema";

export const SettingsForm = ({ orgId }: { orgId: OrgId }) => {
  const { data: settings, refetch } = useQuery({
    queryKey: ["settings", orgId],
    queryFn: () => upsertSettings(orgId),
  });
  const mutation = useMutation({
    mutationFn: (formData: FormData) => mutateSettings(formData, orgId),
    onSuccess: () => {
      toast.success("Settings saved");
      refetch();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to save settings");
    },
  });

  if (!settings) {
    return <>Hello</>;
  }
  const { currency, language } = settings;

  return (
    <form className="flex flex-col gap-4" action={mutation.mutate}>
      <div>
        <Label>Default Currency</Label>
        <Select name="currency" defaultValue={currency ?? undefined}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Currency</SelectLabel>
              {currencyValues.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Language</Label>
        <Select name="language" defaultValue={language ?? undefined}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Language</SelectLabel>
              {languageValues.map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <SubmitButton />
    </form>
  );
};

const SubmitButton = () => {
  const status = useFormStatus();
  return (
    <Button type="submit" disabled={status.pending} className="w-full">
      {status.pending ? "Saving..." : "Save"}
    </Button>
  );
};
