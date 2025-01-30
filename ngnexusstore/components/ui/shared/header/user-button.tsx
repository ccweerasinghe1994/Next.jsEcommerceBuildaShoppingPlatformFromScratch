import React from "react";
import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/lib/actions/user.action";

export default async function UserButton() {
  const session = await auth();

  if (!session) {
    return (
      <>
        <Button asChild>
          <Link href={"/sign-in"}>
            <UserIcon /> sign-in
          </Link>
        </Button>
      </>
    );
  }

  const firstCharacter = session.user?.name?.charAt(0).toUpperCase() ?? "U";

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              className="bg-gray-200 rounded-full w-8 h-8 flex justify-center items-center relative ml-2"
              variant={"ghost"}
            >
              {firstCharacter}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <div className="text-sm font-medium leading-none">
                {session.user?.name}
              </div>
              <div className="text-sm text-muted-foreground">
                {session.user?.email}
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem className="p-0 mb-1">
            <form action={signOutUser} className="w-full">
              <Button
                className="w-full py-4 px-2 h-4 justify-start"
                variant={"ghost"}
              >
                Sign Out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
