import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";

import {
  CreditCard,
  DollarSign,
  LayoutDashboard,
  type LucideIcon,
  Settings,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export type Organization = NonNullable<
  ReturnType<typeof useOrganization>["organization"]
>;

type NavItemProps = {
  isActive: boolean;
  isExpanded: boolean;
  organization: Organization;
  onExpand: (id: string) => void;
};

export const NavItem = ({
  isActive,
  isExpanded,
  organization,
  onExpand,
}: NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    {
      label: "Dashboard",
      Icon: LayoutDashboard,
      href: `/organization/${organization.id}`,
    },
    {
      label: "Budget",
      Icon: DollarSign,
      href: `/organization/${organization.id}/budget`,
    },
    {
      label: "Investments",
      Icon: CreditCard,
      href: `/organization/${organization.id}/investments`,
    },
    {
      label: "Settings",
      Icon: Settings,
      href: `/organization/${organization.id}/settings`,
    },
  ] satisfies { label: string; Icon: LucideIcon; href: string }[];

  return (
    <AccordionItem value={organization.id} className="border-none px-2">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          "flex items-center gap-x-2 rounded-md p-1.5 text-start text-neutral-700 no-underline transition hover:bg-neutral-500/10 hover:no-underline",
          isActive && !isExpanded && "bg-sky-500/10 text-sky-700",
        )}
      >
        <div className="flex items-center gap-x-2 px-2">
          <div className="relative h-7 w-7">
            <Image
              fill
              src={organization.imageUrl}
              alt="Organization"
              className="rounded-sm object-cover"
            />
          </div>
          <span className="text-sm font-medium">{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map(({ href, Icon, label }) => (
          <Button
            key={href}
            size="sm"
            onClick={() => router.push(href)}
            className={cn(
              "mb-1 flex w-full  justify-start gap-2 pl-4 font-normal",
              pathname === href && "bg-sky-500/10 text-sky-700",
            )}
            variant="ghost"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
