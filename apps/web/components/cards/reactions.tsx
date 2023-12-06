import clsx from "clsx";

const reactionTypes = ["💖", "🦄", "🔥", "🤯", "🙌"];

export default function ReactionsCard({ count }: { count: number }) {
  return (
    <div className="border flex flex-col gap-2 border-gray-300 rounded-xl shadow-sm w-full p-4 bg-white">
      You got a total of {count} reactions on your posts!
      <div className="flex flex-row">
        {reactionTypes.map((reaction, idx) => (
          <div
            key={reaction}
            className={clsx({
              "rounded-full bg-gray-100 border-white border h-5 flex flex-col items-center justify-center w-5 z-10":
                true,
              "-ml-1.5": idx !== 0,
            })}
          >
            {reaction}
          </div>
        ))}
      </div>
    </div>
  );
}
