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
import { Currency, Language } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";
import { OrgId } from "@/types/Id";

type SettingsFormProps = {
  orgId: OrgId;
  currency: Currency | null;
  language: Language | null;
};

export const SettingsForm = ({
  orgId,
  currency,
  language,
}: SettingsFormProps) => {
  return (
    <form
      className="flex flex-col gap-4"
      action={async (formData) => {
        try {
          await mutateSettings(formData, orgId);
          toast.success("Settings saved");
          console.log("Settings saved");
        } catch (error) {
          console.error(error);
          toast.error("Failed to save settings");
        }
      }}
    >
      <div>
        <Label>Default Currency</Label>
        <Select name="currency" defaultValue={currency ?? undefined}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Currency</SelectLabel>
              {Object.keys(Currency).map((currency) => (
                <SelectItem key={currency} value={currency}>
                  {currency}
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
              {Object.keys(Language).map((currency) => (
                <SelectItem key={currency} value={currency}>
                  {currency}
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
