export default function CommentsCard({ count }: { count: number }) {
  return (
    <div className="border border-gray-300 rounded-xl shadow-sm w-full p-4 bg-white">
      <span className="font-semibold">{count}</span> people felt compelled to
      comment on your posts! Pretty impressive.
    </div>
  );
}
