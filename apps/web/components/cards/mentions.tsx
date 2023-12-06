export default function MentionsCard({ count }: { count: number }) {
  return (
    <div className="border border-gray-300 rounded-xl shadow-md w-full p-4 bg-white">
      <div className="text-3xl mr-1 font-bold bg-gradient-to-r from-gray-500 via-gray-800 to-black inline-block text-transparent bg-clip-text">
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
