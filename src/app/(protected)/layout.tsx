import { requireAuth } from "@/features/auth/lib/check-auth";
import { ReactNode } from "react";

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  await requireAuth();

  return children;
}
