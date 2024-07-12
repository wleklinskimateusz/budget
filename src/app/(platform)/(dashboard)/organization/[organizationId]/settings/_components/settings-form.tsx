"use client";
import { Label } from "@/components/ui/label";
import { mutateSettings } from "../_actions/mutateSettings";
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
import {
  currencyValues,
  languageValues,
  type Currency,
  type Language,
} from "@/drizzle/schema/settings";
import { getSettings } from "../_actions/getSettings";
import { Skeleton } from "@/components/ui/skeleton";
import { MultiSelect } from "@/components/ui/multi-select";
import { useEffect, useState } from "react";

export const SettingsForm = ({ orgId }: { orgId: OrgId }) => {
  const [selectedCurrencies, setSelectedCurrencies] = useState<Currency[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<
    Language | undefined
  >();
  const [defaultCurrency, setDefaultCurrency] = useState<
    Currency | undefined
  >();

  const { data: settings, refetch } = useQuery({
    queryKey: ["settings", orgId],
    queryFn: () => getSettings(orgId),
  });
  const mutation = useMutation({
    mutationFn: () =>
      mutateSettings(selectedCurrencies, undefined, selectedLanguage, orgId),
    onSuccess: () => {
      toast.success("Settings saved");
      refetch();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to save settings");
    },
  });

  useEffect(() => {
    if (settings?.currencies) {
      setSelectedCurrencies(
        settings.currencies.map((c) => c.currency).filter(Boolean),
      );
      setDefaultCurrency(
        settings.currencies.find((value) => value.isDefault)?.currency ??
          undefined,
      );
    }
    if (settings?.language) setSelectedLanguage(settings.language);
  }, [settings]);

  console.log("language", selectedLanguage);

  if (!settings) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex h-[60px] flex-col gap-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-9" />
        </div>
        <div className="flex h-[60px] flex-col gap-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-9" />
        </div>
        <Skeleton className="h-9" />
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" action={() => mutation.mutate()}>
      <div>
        <Label>Default Currency</Label>
        <MultiSelect
          options={currencyValues}
          values={selectedCurrencies}
          setValues={setSelectedCurrencies}
        />
      </div>
      <div>
        <Label>Default Currency</Label>
        <Select name="defaultCurrency" defaultValue={defaultCurrency}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Currency</SelectLabel>
              {selectedCurrencies.map((c) => (
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
        <Select name="language" defaultValue={selectedLanguage}>
          <SelectTrigger value={selectedLanguage}>
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
