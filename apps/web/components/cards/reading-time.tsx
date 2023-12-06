export default function ReadingTimeCard({
  readingTime,
  totalEstimatedReadingTime,
}: {
  readingTime: number;
  totalEstimatedReadingTime: number;
}) {
  return (
    <div className="border border-gray-300 rounded-xl shadow-sm w-full p-4 bg-white">
      <p>You created {readingTime} minutes worth of content.</p>
      <p>
        Your fans spent{" "}
        <span className="font-semibold">
          ~
          {Math.round(
            totalEstimatedReadingTime > 60
              ? totalEstimatedReadingTime / 60
              : totalEstimatedReadingTime,
          )}
        </span>{" "}
        {totalEstimatedReadingTime > 60 ? "hours" : "minutes"} reading your
        awesome posts!
      </p>
    </div>
  );
}
