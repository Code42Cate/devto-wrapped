export default function MentionsCard({ count }: { count: number }) {
  return (
    <div className="border border-gray-300 rounded-xl shadow-sm w-full p-4 bg-white">
      <span className="font-semibold">{count}</span> people mentioned you in
      their comments.{" "}
      {count > 0 ? (
        <span>You&apos;re basically famous now 🤩</span>
      ) : (
        <span>Are you a ninja? 🥷</span>
      )}
    </div>
  );
}
