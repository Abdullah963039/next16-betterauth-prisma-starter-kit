import { Button } from "@/components/ui/button";
import { SignoutButton } from "@/features/auth/components/signout-button";
import { currentUser } from "@/features/auth/lib/current-user";

export default async function Page() {
  const user = await currentUser();

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center p-6 gap-8">
      <div className="rounded-lg p-8 flex flex-col gap-4 w-full max-w-3xl bg-secondary">
        {Object.entries(user).map((entry, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between text-sm font-mono"
          >
            <span>{entry[0]}</span>
            <span className="font-semibold text-xs bg-neutral-200 rounded-full px-2 py-1">
              {JSON.stringify(entry[1])}
            </span>
          </div>
        ))}
      </div>
      <SignoutButton>
        <Button>Logout</Button>
      </SignoutButton>
    </div>
  );
}
