import { getMentionedCommentCount, getUserdata } from "@/actions/api";
import BestPostCard from "@/components/cards/best-post";
import BusiestMonthCard from "@/components/cards/busiest-month";
import CommentsCard from "@/components/cards/comments";
import FavoriteTag from "@/components/cards/favorite-tag";
import PublishedPostsCard from "@/components/cards/published-posts";
import ReactionsCard from "@/components/cards/reactions";
import ControversialPostCard from "@/components/cards/controversial-post";
import ReadingTimeCard from "@/components/cards/reading-time";
import UsernameForm from "@/components/form";
import Image from "next/image";
import Link from "next/link";
import MentionsCard from "@/components/cards/mentions";
import EmptyUser from "@/components/empty-user";
import { getStats } from "@/actions/stats";

export default async function Page({
  searchParams: { username },
}: {
  searchParams: Record<string, string>;
}) {
  if (!username) {
    username = "code42cate";
  }

  const user = await getUserdata(username);
  if (!user) {
    return <EmptyUser />;
  }

  const stats = await getStats(user.id.toString());
  const mentionsCount = await getMentionedCommentCount(user.username);

  return (
    <div className="flex flex-col items-center py-4 gap-4 max-w-xl mx-auto px-2 overflow-y-auto">
      <div className="relative flex flex-col items-center">
        <h1 className="text-8xl font-bold absolute bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          2023
        </h1>

        <Image
          src={user.profile_image}
          alt={user.name}
          width={100}
          height={100}
          className="rounded-full border-2 border-gray-300 z-10 mt-14 shadow-md"
        />
      </div>

      <h1 className="font-semibold text-lg text-gray-800">
        {user.name}&apos;s Year in Review
      </h1>

      <div className="grid grid-cols-2 gap-2 w-full text-sm text-gray-800">
        <PublishedPostsCard count={stats.postCount} />

        <ReactionsCard count={stats.reactionsCount} />

        <BusiestMonthCard
          busiestMonth={stats.busiestMonth}
          postsPerMonth={stats.postsPerMonth}
        />

        <CommentsCard count={stats.commentsCount} />

        <ReadingTimeCard
          readingTime={stats.readingTime}
          totalEstimatedReadingTime={stats.totalEstimatedReadingTime}
        />

        <FavoriteTag
          favoriteTag={stats.favoriteTag}
          bestPerformingTag={stats.bestPerformingTag}
        />

        {stats.bestPerformingPost && (
          <BestPostCard
            post={stats.bestPerformingPost}
            coverImage={stats.bestPostCoverImage}
          />
        )}

        {stats.mostControversialPost && (
          <ControversialPostCard
            post={stats.mostControversialPost}
            coverImage={stats.controversialCoverImage}
          />
        )}

        <MentionsCard count={mentionsCount} />

        <div className="border border-gray-300 rounded-xl shadow-md w-full p-4 bg-white flex flex-col gap-2">
          Want to check out your own stats?
          <UsernameForm />
        </div>
      </div>

      <div className="flex flex-row items-center justify-end w-full gap-2">
        <Link
          href="https://sliplane.io?utm_source=devtowrapped&utm_campagin=oss"
          className="rounded-md bg-black text-white px-2 py-1 flex flex-row items-center text-sm"
        >
          <Image alt="sliplane logo" src="/logo.svg" width={16} height={16} />
          Powered by
          <span className="ml-1 font-semibold">Sliplane</span>
        </Link>
      </div>
    </div>
  );
}
