"use client";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsernameForm() {
  const [username, setUsername] = useState("");

  const { push } = useRouter();

  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("username") === username) {
      setIsLoading(false);
    }
  }, [setIsLoading, searchParams, username]);

  return (
    <div className="flex flex-row gap-2">
      <Input
        placeholder="your dev.to username"
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <Button
        disabled={isLoading}
        onClick={() => {
          setIsLoading(true);
          push(`/?username=${username}`);
        }}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "👀"}
      </Button>
    </div>
  );
}
