import { Input } from "@ui/components/input";
import { Button } from "@ui/components/button";

export default async function Page() {
  return (
    <main className="flex flex-col items-center py-4 gap-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold">dev.to 2023 wrapped</h1>

      <div className="flex flex-row gap-4 w-full">
        <Input className="" placeholder="code42cate42" />

        <Button>Start</Button>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full justify-between">
        <div className="border border-neutral-300 rounded-xl h-60 p-4">
          wrapped preview
        </div>

        <div className="border border-neutral-300 rounded-xl h-60 p-4">
          wrapped preview
        </div>
        <div className="border border-neutral-300 rounded-xl h-60 p-4">
          wrapped preview
        </div>
      </div>
    </main>
  );
}
