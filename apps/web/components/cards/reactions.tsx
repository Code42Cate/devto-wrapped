"use client";
import clsx from "clsx";
import { useReward } from "react-rewards";

const reactionTypes = ["💖", "🦄", "🔥", "🤯", "🙌"];

export default function ReactionsCard({ count }: { count: number }) {
  const { reward, isAnimating } = useReward("reactions", "emoji", {
    emoji: reactionTypes,
  });

  return (
    <div className="flex w-full flex-col gap-2 rounded-xl border border-gray-300 bg-white p-4 shadow-md">
      <span>
        You got a total of
        <div className="mx-1 inline-block bg-gradient-to-r from-gray-500 via-gray-800 to-black bg-clip-text text-2xl font-bold text-transparent">
          {count}
        </div>{" "}
        reactions on your posts!
      </span>
      <div className="flex flex-row">
        {reactionTypes.map((reaction, idx) => (
          <button
            id="reactions"
            onClick={reward}
            disabled={isAnimating}
            key={reaction}
            className={clsx({
              "z-10 flex h-5 w-5 flex-col items-center justify-center rounded-full border border-white bg-gray-100":
                true,
              "-ml-1.5": idx !== 0,
            })}
          >
            {reaction}
          </button>
        ))}
      </div>
    </div>
  );
}
