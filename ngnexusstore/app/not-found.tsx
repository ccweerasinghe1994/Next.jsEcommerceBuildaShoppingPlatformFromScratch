"use client";
import Image from "next/image";
import React from "react";

import { APP_NAME } from "@/lib/contants";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <div className="flex items-center min-h-screen justify-center flex-col">
      <Image
        src={"/images/logo.svg"}
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
        priority
      />
      <div className="w-1/3 p-6 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Not Found</h1>
        <p className="text-destructive">
          The page you are looking for does not exist.
        </p>
        <Button
          onClick={() => (window.location.href = "/")}
          variant={"outline"}
          className="mt-4 ml-2"
        >
          Back To Home
        </Button>
      </div>
    </div>
  );
}
