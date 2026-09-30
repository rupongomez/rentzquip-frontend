import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AccessDenied() {
  return (
    <div className="flex w-full justify-center items-center h-screen">
      <div className="flex gap-3">
        <div className="bg-red-200 rounded-full p-4 ">
          <ShieldAlert className="text-red-500 size-8" />
        </div>
        <div>
          <h1 className="text-lg font-semibold">
            You do not have access to this page
          </h1>
          <p>
            Go Back to{" "}
            <Link className="underline" href="/">
              Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
