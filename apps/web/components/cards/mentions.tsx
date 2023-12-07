export default function MentionsCard({ count }: { count: number }) {
  return (
    <div className="w-full rounded-xl border border-gray-300 bg-white p-4 shadow-md">
      <div className="mr-1 inline-block bg-gradient-to-r from-gray-500 via-gray-800 to-black bg-clip-text text-3xl font-bold text-transparent">
        {count}
      </div>
      {count === 1 ? "dev" : "devs"} mentioned you in their{" "}
      {count === 1 ? "comment" : "comments"}.{" "}
      {count > 0 ? (
        <span>You&apos;re basically famous now 🤩</span>
      ) : (
        <span>Are you a ninja? 🥷</span>
      )}
    </div>
  );
}
