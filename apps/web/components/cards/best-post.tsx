import Image from "next/image";
import { Article } from "@/actions/api";

export default function BestPostCard({
  post,
  coverImage,
}: {
  post: Article;
  coverImage: string;
}) {
  return (
    <div className="flex w-full flex-col justify-between gap-2 rounded-xl border border-gray-300 bg-white p-4 shadow-md">
      Your fans really loved this post: <br />
      <Image
        src={coverImage}
        alt={post.title}
        width={500}
        height={500}
        className="rounded-md border border-gray-300"
      />
      <a
        className="font-semibold underline-offset-2"
        href={`https://dev.to${post.path}`}
      >
        {post.title}
      </a>
    </div>
  );
}
