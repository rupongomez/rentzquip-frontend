import React from "react";
import { LoaderIcon } from "lucide-react";
export default function AuthLoading({
  label = "Loading...",
}: {
  label?: string;
}) {
  return (
    <div className="flex  items-center justify-center w-full h-screen ">
      <div className="flex gap-2">
        <LoaderIcon className="size-6 animate-spin" />
        {label}
      </div>
    </div>
  );
}
