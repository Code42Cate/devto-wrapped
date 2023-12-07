import Link from "next/link";
import UsernameForm from "./form";

export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">{message}</h1>
      <div className="flex w-full flex-col gap-2 rounded-xl border border-gray-300 bg-white p-4 shadow-md">
        <span>
          Try something else, or{" "}
          <Link
            href="/?username=code42cate"
            className="underline underline-offset-1"
          >
            check out my own wrapped
          </Link>
        </span>
        <UsernameForm />
      </div>
    </div>
  );
}
