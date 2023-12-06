import MonthsChart from "../months";

export default function BusiestMonthCard({
  postsPerMonth,
  busiestMonth,
}: {
  postsPerMonth: Record<string, number>;
  busiestMonth: string;
}) {
  return (
    <div className="border flex flex-col justify-between border-gray-300 rounded-xl shadow-md w-full p-4 bg-white h-40">
      <span>
        Your busiest month was{" "}
        <span className="font-semibold text-green-500">{busiestMonth}</span>
      </span>
      <MonthsChart data={postsPerMonth} />
    </div>
  );
}
