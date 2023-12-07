import MonthsChart from "../months";

export default function BusiestMonthCard({
  postsPerMonth,
  busiestMonth,
}: {
  postsPerMonth: Record<string, number>;
  busiestMonth: string;
}) {
  return (
    <div className="flex h-40 w-full flex-col justify-between rounded-xl border border-gray-300 bg-white p-4 shadow-md">
      <span>
        Your busiest month was{" "}
        <span className="font-semibold text-green-500">{busiestMonth}</span>
      </span>
      <MonthsChart data={postsPerMonth} />
    </div>
  );
}
