export default function MentionsCard({ count }: { count: number }) {
  return (
    <div className="border border-gray-300 rounded-xl shadow-sm w-full p-4 bg-white">
      <span className="font-semibold">{count}</span> people mentioned you in
      their comments. You&apos;re basically famous now 🤩
    </div>
  );
}
