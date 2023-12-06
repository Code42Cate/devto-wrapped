export default function CommentsCard({ count }: { count: number }) {
  return (
    <div className="border flex flex-row gap-2 items-center border-gray-300 rounded-xl shadow-sm w-full p-4 bg-white">
      <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
        {count}
      </div>
      People discussed tech with you! Pretty cool, huh?
    </div>
  );
}
