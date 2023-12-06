export default function ReadingTimeCard({
  totalEstimatedReadingTime,
}: {
  readingTime: number;
  totalEstimatedReadingTime: number;
}) {
  return (
    <div className="border border-gray-300 rounded-xl shadow-md w-full p-4 bg-white">
      <span>
        Your fans spent
        <div className="text-3xl mx-1 font-bold bg-gradient-to-r from-gray-500 via-gray-800 to-black inline-block text-transparent bg-clip-text">
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
