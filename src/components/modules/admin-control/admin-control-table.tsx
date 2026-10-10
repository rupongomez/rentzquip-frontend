import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserResponse } from "@/types";
import { SearchX } from "lucide-react";

interface AdminControlTableProps {
  users: UserResponse[];
  onViewDetails: (userId: string) => void;
}

function statusClass(status: UserResponse["status"]) {
  return status === "ACTIVE"
    ? "bg-emerald-100 text-emerald-800"
    : "bg-rose-100 text-rose-800";
}

export default function AdminControlTable({
  users,
  onViewDetails,
}: AdminControlTableProps) {
  if (!users.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <SearchX className="mx-auto size-10 text-slate-400" />
        <p className="mt-4 font-semibold text-slate-900">No users found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try another search or filter.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Verification</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="size-10 overflow-hidden rounded-full bg-emerald-100">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center font-semibold text-emerald-700">
                        {getInitials(user.name)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.contactNumber || "No phone number"}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {user.role}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={
                    user.emailVerified
                      ? "text-emerald-700"
                      : "text-amber-700"
                  }
                >
                  {user.emailVerified ? "Verified" : "Unverified"}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(user.status)}`}
                >
                  {user.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewDetails(user.id)}
                >
                  View details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
