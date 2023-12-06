import {
  Article,
  getMentionedCommentCount,
  getPosts,
  getUserdata,
} from "@/actions/api";
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

export default async function Page({
  searchParams: { username },
}: {
  searchParams: Record<string, string>;
}) {
  const user = await getUserdata(username);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">User not found</h1>
      </div>
    );
  }

  const posts = await getPosts(user.id.toString());
  const mentionsCount = await getMentionedCommentCount(user.username);

  const postCount = posts?.length ?? 0;

  const reactionsCount = posts?.reduce((acc: number, post: Article) => {
    return acc + post.public_reactions_count;
  }, 0);

  const reactionsPerTag: Record<string, number> = posts?.reduce(
    (acc: Record<string, number>, post: Article) => {
      post.tag_list.forEach((tag) => {
        if (acc[tag]) {
          acc[tag] += post.public_reactions_count;
        } else {
          acc[tag] = post.public_reactions_count;
        }
      });

      return acc;
    },
    {} as Record<string, number>,
  );

  const commentsCount = posts?.reduce((acc: number, post: Article) => {
    return acc + post.comments_count;
  }, 0);

  const readingTime = posts?.reduce((acc: number, post: Article) => {
    return acc + post.reading_time;
  }, 0);

  // reading_time times reactions_count per post, summed up
  const totalEstimatedReadingTime = posts?.reduce(
    (acc: number, post: Article) => {
      return acc + post.reading_time * post.public_reactions_count;
    },
    0,
  );

  const postsPerTag: Record<string, number> = posts?.reduce(
    (acc: Record<string, number>, post: Article) => {
      post.tag_list.forEach((tag) => {
        if (acc[tag]) {
          acc[tag] += 1;
        } else {
          acc[tag] = 1;
        }
      });

      return acc;
    },
    {} as Record<string, number>,
  );

  const postsPerMonth: Record<string, number> = posts?.reduce(
    (acc: Record<string, number>, post: Article) => {
      const date = new Date(post.published_at_int * 1000);
      const month = date.toLocaleString("default", { month: "long" });

      if (acc[month]) {
        acc[month] += 1;
      } else {
        acc[month] = 1;
      }

      return acc;
    },
    {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    },
  );

  const busiestMonth = Object.entries(postsPerMonth).find(
    ([, count]) => count === Math.max(...Object.values(postsPerMonth)),
  )?.[0];

  const favoriteTag = Object.entries(postsPerTag).find(
    ([, count]) => count === Math.max(...Object.values(postsPerTag)),
  )?.[0];

  const bestPerformingTag = Object.entries(reactionsPerTag).find(
    ([, count]) => count === Math.max(...Object.values(reactionsPerTag)),
  )?.[0];

  const bestPerformingPost = posts?.find(
    (post) =>
      post.public_reactions_count ===
      Math.max(...posts.map((post) => post.public_reactions_count)),
  );

  const mostControversialPost = posts?.find(
    (post) =>
      post.comments_count ===
      Math.max(...posts.map((post) => post.comments_count)),
  );

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
        <PublishedPostsCard count={postCount} />

        <ReactionsCard count={reactionsCount} />

        <BusiestMonthCard
          busiestMonth={busiestMonth}
          postsPerMonth={postsPerMonth}
        />
        <CommentsCard count={commentsCount} />

        <ReadingTimeCard
          readingTime={readingTime}
          totalEstimatedReadingTime={totalEstimatedReadingTime}
        />

        <FavoriteTag
          favoriteTag={favoriteTag}
          bestPerformingTag={bestPerformingTag}
        />

        {bestPerformingPost && <BestPostCard post={bestPerformingPost} />}

        {mostControversialPost && (
          <ControversialPostCard post={mostControversialPost} />
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
