export default function CommentsCard({ count }: { count: number }) {
  return (
    <div className="flex w-full flex-row items-center gap-2 rounded-xl border border-gray-300 bg-white p-4 shadow-md">
      <div className="inline-block bg-gradient-to-r from-gray-500 via-gray-800 to-black bg-clip-text text-5xl font-bold text-transparent">
        {count}
      </div>
      People discussed tech with you! Pretty cool, huh?
    </div>
  );
}
