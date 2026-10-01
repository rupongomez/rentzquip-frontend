import { BecomeProviderForm } from "@/components/form/become-provider-form";
import React from "react";

export default function page() {
  return (
    <section>
      <div className="flex flex-col gap-2 items-center text-center">
        <h1 className="text-2xl font-bold tracking-tight">Become a Provider</h1>
        <p className="text-balance text-sm text-muted-foreground ">
          Fill out the form below to become a provider.
        </p>
      </div>
      <BecomeProviderForm />
    </section>
  );
}
