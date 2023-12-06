export default function FavoriteTag({
  favoriteTag,
  bestPerformingTag,
}: {
  favoriteTag: string;
  bestPerformingTag: string;
}) {
  return (
    <div className="border flex flex-col justify-center border-gray-300 rounded-xl shadow-md w-full p-4 bg-white">
      <div>
        {favoriteTag === bestPerformingTag ? (
          <>
            Your favorite and best performing tag was
            <a
              className="underline underline-offset-2 ml-1"
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
              className="underline underline-offset-2 ml-1"
              rel="noopener noreferrer"
              target="_blank"
              href={`https://dev.to/t/${favoriteTag}`}
            >
              #{favoriteTag}
            </a>
            , your best performing tag was
            <a
              className="underline underline-offset-2 ml-1"
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
