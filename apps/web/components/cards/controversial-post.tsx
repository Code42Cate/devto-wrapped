import { Article } from "@/actions/api";

export default function ControversialPostCard({ post }: { post: Article }) {
  return (
    <div className="border border-gray-300 rounded-xl shadow-md w-full p-4 bg-white flex flex-col gap-1">
      <a
        className="underline underline-offset-2"
        href={`https://dev.to${post.path}`}
      >
        {post.title}
      </a>{" "}
      really got people talking! It&apos;s your most commented post.
    </div>
  );
}
