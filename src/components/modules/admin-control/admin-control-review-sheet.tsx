import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useUpdateUserStatusByAdmin } from "@/hooks/user.hook";
import { UserResponse, UserStatus } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

interface AdminControlReviewSheetProps {
  selectedId: string;
  users: UserResponse[];
  onClose: () => void;
}

export default function AdminControlReviewSheet({
  selectedId,
  users,
  onClose,
}: AdminControlReviewSheetProps) {
  const selectedUser = users.find((user) => user.id === selectedId);
  const queryClient = useQueryClient();
  const { mutate: updateUserStatus, isPending: isUpdating } =
    useUpdateUserStatusByAdmin();

  if (!selectedId || !selectedUser) return null;

  const handleStatusUpdate = (status: UserStatus) => {
    updateUserStatus(
      { userId: selectedUser.id, status },
      {
        onSuccess: (response) => {
          if (response && !response.success) {
            toast.add({
              title: "Update failed",
              description:
                response.message || "Unable to update the user status.",
              type: "error",
            });
            return;
          }

          queryClient.invalidateQueries({ queryKey: ["all-users-admin"] });
          toast.add({
            title: "Status updated",
            description: `User status changed to ${status}.`,
            type: "success",
          });
          onClose();
        },
        onError: () => {
          toast.add({
            title: "Update failed",
            description: "Unable to update the user status.",
            type: "error",
          });
        },
      },
    );
  };

  return (
    <Sheet open={!!selectedId} onOpenChange={(open) => !open && onClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>User details</SheetTitle>
          <SheetDescription>
            Review account information and control the user&apos;s access.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-5 px-6 pb-6">
          <div className="rounded-2xl bg-emerald-50 p-5 text-center">
            <div className="mx-auto size-20 overflow-hidden rounded-full bg-white">
              {selectedUser.avatar ? (
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="size-full object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center text-2xl font-bold text-emerald-700">
                  {getInitials(selectedUser.name)}
                </div>
              )}
            </div>
            <h2 className="mt-3 text-lg font-semibold text-slate-900">
              {selectedUser.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              {selectedUser.role}
            </p>
          </div>

          <div className="space-y-3 rounded-xl border border-slate-200 p-4">
            <Info label="Email" value={selectedUser.email} />
            <Info
              label="Phone"
              value={selectedUser.contactNumber || "Not provided"}
            />
            <Info label="Auth provider" value={selectedUser.authProvider} />
            <Info
              label="Email status"
              value={selectedUser.emailVerified ? "Verified" : "Unverified"}
            />
            <Info
              label="Joined"
              value={format(new Date(selectedUser.createdAt), "PPP")}
            />
          </div>

          <div className="flex gap-3">
            <Button
              className="flex-1"
              disabled={selectedUser.status === "ACTIVE" || isUpdating}
              onClick={() => handleStatusUpdate("ACTIVE")}
            >
              Activate
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              disabled={selectedUser.status === "BLOCKED" || isUpdating}
              onClick={() => handleStatusUpdate("BLOCKED")}
            >
              Block
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="break-all text-sm text-slate-800">{value}</span>
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
