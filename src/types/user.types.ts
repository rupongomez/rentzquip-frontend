export type UserRole = "ADMIN" | "MODERATOR" | "PROVIDER" | "CUSTOMER";

export type UserStatus = "ACTIVE" | "BLOCKED";

export type UserResponse = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  isDeleted: boolean;
  contactNumber: string | null;
  stripeCustomerId: string | null;
  googleId: string | null;
  authProvider: "CREDENTIALS" | "GOOGLE";
  createdAt: string;
  updatedAt: string;
};
