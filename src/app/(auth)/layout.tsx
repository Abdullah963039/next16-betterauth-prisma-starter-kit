import { noRequireAuth } from "@/features/auth/lib/check-auth";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  await noRequireAuth();

  return (
    <div className="bg-primary/5 flex min-h-dvh flex-col items-center justify-center">
      {children}
    </div>
  );
}
