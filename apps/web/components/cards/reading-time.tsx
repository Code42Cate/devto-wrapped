export default function ReadingTimeCard({
  totalEstimatedReadingTime,
}: {
  readingTime: number;
  totalEstimatedReadingTime: number;
}) {
  return (
    <div className="w-full rounded-xl border border-gray-300 bg-white p-4 shadow-md">
      <span>
        Your fans spent
        <div className="mx-1 inline-block bg-gradient-to-r from-gray-500 via-gray-800 to-black bg-clip-text text-3xl font-bold text-transparent">
          {Math.round(
            totalEstimatedReadingTime > 60
              ? totalEstimatedReadingTime / 60
              : totalEstimatedReadingTime,
          )}
        </div>
        {totalEstimatedReadingTime > 60 ? "hours" : "minutes"} reading your
        awesome posts!
      </span>
    </div>
  );
}
