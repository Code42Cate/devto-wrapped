export default function FavoriteTag({
  favoriteTag,
  bestPerformingTag,
}: {
  favoriteTag: string;
  bestPerformingTag: string;
}) {
  return (
    <div className="flex w-full flex-col justify-center rounded-xl border border-gray-300 bg-white p-4 shadow-md">
      <div>
        {favoriteTag === bestPerformingTag ? (
          <>
            Your favorite and best performing tag was
            <a
              className="ml-1 underline underline-offset-2"
              rel="noopener noreferrer"
              target="_blank"
              href={`https://dev.to/t/${favoriteTag}`}
            >
              #{favoriteTag}
            </a>
            !
          </>
        ) : (
          <>
            Although your favorite tag was
            <a
              className="ml-1 underline underline-offset-2"
              rel="noopener noreferrer"
              target="_blank"
              href={`https://dev.to/t/${favoriteTag}`}
            >
              #{favoriteTag}
            </a>
            , your best performing tag was
            <a
              className="ml-1 underline underline-offset-2"
              href={`https://dev.to/t/${bestPerformingTag}`}
            >
              #{bestPerformingTag}
            </a>
            <span className="ml-1 text-base">👀</span>
          </>
        )}
      </div>
    </div>
  );
}
