"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Icon } from "@virtuslab/tetrisly-icons";
import { Button } from "./ui/Button";
import { useRouter } from "next/navigation";

export const AvatarButton = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  if (!user) return null;

  const name = `${user?.firstName} ${user?.lastName}`;
  const initials = `${user?.firstName?.[0]}${user?.lastName?.[0]}`;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.imageUrl} alt={name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Hello {user?.firstName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            variant="destructive"
            type="button"
            className="flex w-full justify-between"
            onClick={() => signOut(() => router.push("/"))}
          >
            <span>Logout</span>
            <Icon name="20-log-out" />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
