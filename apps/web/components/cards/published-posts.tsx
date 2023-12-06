export default function PublishedPostsCard({ count }: { count: number }) {
  return (
    <div className="flex flex-row items-center gap-2 border border-gray-300 rounded-xl shadow-sm w-full p-4 bg-white">
      <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
        {count}
      </div>
      <div className="text-lg">Posts Published 🎉</div>
    </div>
  );
}
