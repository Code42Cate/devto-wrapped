import Link from "next/link";
import UsernameForm from "./form";

export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-xl mx-auto gap-4">
      <h1 className="text-4xl font-bold">{message}</h1>
      <div className="border border-gray-300 rounded-xl shadow-md w-full p-4 bg-white flex flex-col gap-2">
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
