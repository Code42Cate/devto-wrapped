"use client";
import clsx from "clsx";
import { useReward } from "react-rewards";

const reactionTypes = ["💖", "🦄", "🔥", "🤯", "🙌"];

export default function ReactionsCard({ count }: { count: number }) {
  const { reward, isAnimating } = useReward("reactions", "emoji", {
    emoji: reactionTypes,
  });

  return (
    <div className="border flex flex-col gap-2 border-gray-300 rounded-xl shadow-sm w-full p-4 bg-white">
      You got a total of {count} reactions on your posts!
      <div className="flex flex-row">
        {reactionTypes.map((reaction, idx) => (
          <button
            id="reactions"
            onClick={reward}
            disabled={isAnimating}
            key={reaction}
            className={clsx({
              "rounded-full bg-gray-100 border-white border h-5 flex flex-col items-center justify-center w-5 z-10":
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
