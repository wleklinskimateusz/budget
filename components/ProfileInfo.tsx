"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Icon } from "@virtuslab/tetrisly-icons";
import { Button } from "./ui/Button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Settings } from "./settings";
import { Skeleton } from "./ui/skeleton";

export const ProfileInfo = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  console.log("loaded", isLoaded);

  return (
    <div className="mt-auto flex flex-col gap-4">
      <div className="flex flex-col items-center gap-4">
        <UserAvatar user={user} isLoaded={isLoaded} />
        <UserWelcome user={user} isLoaded={isLoaded} />
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={!isLoaded} className="w-full" variant="outline">
            <Icon name="20-settings" className="mr-2 h-5 w-5" />
            Settings
          </Button>
        </DialogTrigger>
        <Settings />
      </Dialog>
      <Button
        className="w-full"
        variant="destructive"
        onClick={() => signOut()}
        disabled={!isLoaded}
      >
        <Icon name="20-log-out" className="mr-2 h-5 w-5" />
        Logout
      </Button>
    </div>
  );
};

type UseUserReturn = Pick<ReturnType<typeof useUser>, "isLoaded" | "user">;

function UserAvatar({ user, isLoaded }: UseUserReturn) {
  if (!isLoaded) {
    return <Skeleton className="h-9 w-9 rounded-full" />;
  }
  const name = `${user?.firstName} ${user?.lastName}`;
  const initials = `${user?.firstName?.[0]}${user?.lastName?.[0]}`;
  if (!user) return null;
  return (
    <Avatar className="h-9 w-9">
      <AvatarImage alt={name} src={user.imageUrl} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}

function UserWelcome({ user, isLoaded }: UseUserReturn) {
  if (!isLoaded) {
    return (
      <div className="flex flex-col text-center">
        <Skeleton className="h-6 w-full" />
        <span className="text-sm font-medium">Welcome back</span>
      </div>
    );
  }
  if (!user) return null;
  return (
    <div className="flex flex-col text-center">
      <span className="font-bold">{user.firstName}</span>
      <span className="text-sm font-medium">Welcome back</span>
    </div>
  );
}
