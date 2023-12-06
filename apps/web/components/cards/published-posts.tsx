export default function PublishedPostsCard({ count }: { count: number }) {
  return (
    <div className="border border-gray-300 rounded-xl shadow-sm w-full p-4 bg-white">
      You published {count} posts! That&apos;s more than 99.99% of DEV users 🎉
    </div>
  );
}
