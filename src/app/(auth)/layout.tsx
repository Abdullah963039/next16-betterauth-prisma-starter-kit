import { requireUnauth } from "@/features/auth/lib/utils";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  await requireUnauth();

  return (
    <div className="bg-primary/5 flex min-h-dvh flex-col items-center justify-center">
      {children}
    </div>
  );
}
