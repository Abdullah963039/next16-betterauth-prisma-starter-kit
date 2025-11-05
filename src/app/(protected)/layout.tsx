import { requireAuth } from "@/features/auth/lib/utils";
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
