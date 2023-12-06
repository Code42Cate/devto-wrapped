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
    <div className="border flex flex-col justify-between gap-2 border-gray-300 rounded-xl shadow-md w-full p-4 bg-white">
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
