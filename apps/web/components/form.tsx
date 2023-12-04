"use client";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import { useState } from "react";

import { useRouter } from "next/navigation";

export default function UsernameForm() {
  const [username, setUsername] = useState("");

  const { push } = useRouter();

  return (
    <div className="flex flex-row gap-2">
      <Input
        placeholder="code42cate"
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <Button
        onClick={() => {
          console.log(username);
          push(`/review?username=${username}`);
        }}
      >
        👀
      </Button>
    </div>
  );
}
