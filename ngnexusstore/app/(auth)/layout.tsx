import React, { ReactNode } from "react";

type Props = Readonly<{
  children: ReactNode;
}>;

export default function AuthLayout({ children }: Props) {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      {children}
    </div>
  );
}
