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

type SettingsFormProps = {
  orgId: string;
  currency: Currency | undefined;
  language: Language | undefined;
};

export const SettingsForm = ({
  orgId,
  currency,
  language,
}: SettingsFormProps) => {
  return (
    <form
      data-testid="settings-form"
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
        <Select name="currency" defaultValue={currency}>
          <SelectTrigger data-testid="currency-trigger">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Currency</SelectLabel>
              {Object.keys(Currency).map((currency) => (
                <SelectItem
                  data-testid={`currency-${currency}`}
                  key={currency}
                  value={currency}
                >
                  {currency}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Language</Label>
        <Select name="language" defaultValue={language}>
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
