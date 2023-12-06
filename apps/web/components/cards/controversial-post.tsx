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
    <div className="border border-gray-300 rounded-xl shadow-md w-full p-4 bg-white flex flex-col gap-1">
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
