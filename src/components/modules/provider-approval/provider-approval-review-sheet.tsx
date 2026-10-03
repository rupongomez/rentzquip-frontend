import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useGetProviderById } from "@/hooks/provider.hook";
import React from "react";

interface Props {
  selectedId: string;
  onClose: () => void;
}

export default function ProviderApprovalReviewSheet({
  selectedId,
  onClose,
}: Props) {
  const { data: providerData } = useGetProviderById(selectedId);
  console.log(providerData);
  return (
    <Sheet open={!!selectedId} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle> Review Approval - Provider</SheetTitle>
          <SheetDescription>
            View the details of the provider and approve or reject their
            application.
          </SheetDescription>
        </SheetHeader>

        <div></div>
      </SheetContent>
    </Sheet>
  );
}
