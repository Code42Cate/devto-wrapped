import { Article } from "@/actions/api";
import Image from "next/image";

export default function ControversialPostCard({
  post,
  coverImage,
}: {
  post: Article;
  coverImage: string;
}) {
  return (
    <div className="flex w-full flex-col gap-1 rounded-xl border border-gray-300 bg-white p-4 shadow-md">
      <Image
        src={coverImage}
        alt={post.title}
        width={500}
        height={500}
        className="rounded-md border border-gray-300"
      />
      <a className="font-semibold" href={`https://dev.to${post.path}`}>
        {post.title}
      </a>{" "}
      really got people talking! It&apos;s your most commented post.
    </div>
  );
}
