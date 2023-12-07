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
import EmptyUser from "@/components/empty-state";
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
    return <EmptyUser message="This user could not be found 🫠" />;
  }

  const stats = await getStats(user.id.toString());
  const mentionsCount = await getMentionedCommentCount(user.username);

  if (stats.postCount === 0) {
    return <EmptyUser message="This user has no posts 🫠" />;
  }

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 overflow-y-auto px-2 py-4">
      <div className="relative flex flex-col items-center">
        <h1 className="absolute inline-block bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-8xl font-bold text-transparent">
          2023
        </h1>

        <Image
          src={user.profile_image}
          alt={user.name}
          width={100}
          height={100}
          className="z-10 mt-14 rounded-full border-2 border-gray-300 shadow-md"
        />
      </div>

      <h1 className="text-lg font-semibold text-gray-800">
        {user.name}&apos;s Year in Review
      </h1>

      <div className="grid w-full grid-cols-2 gap-2 text-sm text-gray-800">
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

        <div className="flex w-full flex-col gap-2 rounded-xl border border-gray-300 bg-white p-4 shadow-md">
          Want to check out your own stats?
          <UsernameForm />
        </div>
      </div>

      <div className="flex w-full flex-row items-center justify-end gap-2">
        <Link
          href="https://sliplane.io?utm_source=devtowrapped&utm_campagin=oss"
          className="flex flex-row items-center rounded-md bg-black px-2 py-1 text-sm text-white"
        >
          <Image alt="sliplane logo" src="/logo.svg" width={16} height={16} />
          Powered by
          <span className="ml-1 font-semibold">Sliplane</span>
        </Link>
      </div>
    </div>
  );
}
