import { Button } from "@/components/ui/button";
import { format } from "date-fns";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  useGetAllProviders,
  useGetProviderById,
  useSuspenseGetAllProviders,
  useUpdateProviderStatus,
} from "@/hooks/provider.hook";

interface Props {
  selectedId: string;
  onClose: () => void;
}

export default function ProviderApprovalReviewSheet({
  selectedId,
  onClose,
  ...params
}: Props) {
  const { data: providerList, isLoading } = useSuspenseGetAllProviders(params);
  const { mutate: updateProviderStatus, isPending: isUpdating } =
    useUpdateProviderStatus();
  const handleStatusUpdate = (status: string) => {
    if (selectedId) {
      updateProviderStatus({ id: selectedId, status }, { onSuccess: onClose });
    }
  };

  console.log(providerList?.data);
  // return;

  const selectedProvider = providerList?.data?.find(
    (provider) => provider.id === selectedId,
  );

  if (!selectedId) return null;

  if (isLoading) {
    return <div>Loading...</div>;
  }
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

        <div className="flex flex-col justify-center gap-2 py-4 px-5">
          <img
            className="h-30 w-auto rounded-full object-cover mx-auto"
            src={selectedProvider?.imageUrl}
            alt={selectedProvider?.name}
          />
          <h2 className="text-lg font-semibold text-center">
            {selectedProvider?.name}
          </h2>
          <p>
            {" "}
            CurrentStatus:{" "}
            <span
              className={
                selectedProvider?.status === "ACTIVE"
                  ? "text-green-500"
                  : selectedProvider?.status === "REJECTED"
                    ? "orange-500"
                    : "text-muted-foreground"
              }
            >
              {selectedProvider?.status}
            </span>{" "}
          </p>
          <p className="text-sm text-muted-foreground">
            {" "}
            Email: {selectedProvider?.email}
          </p>
          <p className="text-sm text-muted-foreground">
            {" "}
            Address: {selectedProvider?.address}
          </p>
          <p className="text-sm text-muted-foreground">
            {" "}
            Phone: {selectedProvider?.phoneNumber}
          </p>
          <p className="text-sm text-muted-foreground">
            {" "}
            Bio: {selectedProvider?.description}
          </p>
          <p>
            Requested At:{" "}
            {selectedProvider?.createdAt
              ? format(new Date(selectedProvider.createdAt), "PPP")
              : "N/A"}
          </p>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="default"
            disabled={selectedProvider?.status === "ACTIVE" || isUpdating}
            onClick={() => handleStatusUpdate("ACTIVE")}
          >
            Approve
          </Button>
          <Button
            variant="destructive"
            disabled={
              selectedProvider?.status === "REJECTED" ||
              selectedProvider?.status === "ACTIVE" ||
              isUpdating
            }
            onClick={() => handleStatusUpdate("REJECT")}
          >
            Reject
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
