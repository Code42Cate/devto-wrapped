import { Article } from "@/actions/api";

export default function BestPostCard({ post }: { post: Article }) {
  return (
    <div className="border border-gray-300 rounded-xl shadow-sm w-full p-4 bg-white flex flex-col justify-between">
      Your fans really loved this post: <br />
      <a
        className="underline underline-offset-2"
        href={`https://dev.to${post.path}`}
      >
        {post.title}
      </a>
    </div>
  );
}
