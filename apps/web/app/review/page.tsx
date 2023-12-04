import UsernameForm from "@/components/form";
import MonthsChart from "@/components/months";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

type Article = {
  class_name: string;
  cloudinary_video_url: any;
  comments_count: number;
  id: number;
  path: string;
  public_reactions_count: number;
  readable_publish_date: string;
  reading_time: number;
  title: string;
  user_id: number;
  public_reaction_categories: Array<{
    slug: string;
    name: string;
    icon: string;
    position: number;
  }>;
  video_duration_string: string;
  published_at_int: number;
  tag_list: Array<string>;
  flare_tag: any;
  user: {
    name: string;
    profile_image_90: string;
    username: string;
  };
  organization?: {
    name: string;
    profile_image_90: string;
    slug: string;
  };
};

type User = {
  type_of: string;
  id: number;
  username: string;
  name: string;
  twitter_username: any;
  github_username: string;
  summary: string;
  location: string;
  website_url: string;
  joined_at: string;
  profile_image: string;
};

async function getPosts(userId: string, page = 0) {
  const res = await fetch(
    `https://dev.to/search/feed_content?per_page=100&page=${page}&user_id=${userId}&class_name=Article&sort_by=published_at&sort_direction=desc&approved=`
  );
  if (!res.ok) {
    return undefined;
  }

  const data = await res.json();

  // filter by year
  const posts = data.result.filter(
    (post: Article) => post.published_at_int >= 1672531200
  );

  if (data.result.length === 100) {
    return [...posts, ...(await getPosts(userId, page + 1))];
  }

  return posts as Article[];
}

async function getMentionedCommentCount(username: string) {
  const res = await fetch(
    `https://dev.to/search/feed_content?per_page=60&page=0&class_name=Comment&search_fields=${username}`
  );

  if (!res.ok) {
    return undefined;
  }

  const data = await res.json();

  return data.result.length as number;
}

async function getUserdata(username: string): Promise<User | undefined> {
  const res = await fetch(
    `https://dev.to/api/users/by_username?url=${username}`
  );
  if (!res.ok) {
    return undefined;
  }

  const data = await res.json();

  return data as User;
}

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
    {} as Record<string, number>
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
    0
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
    {} as Record<string, number>
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
    }
  );

  const busiestMonth = Object.entries(postsPerMonth).find(
    ([, count]) => count === Math.max(...Object.values(postsPerMonth))
  )?.[0];

  const reactionTypes = ["💖", "🦄", "🔥", "🤯", "🙌"];

  const favoriteTag = Object.entries(postsPerTag).find(
    ([, count]) => count === Math.max(...Object.values(postsPerTag))
  )?.[0];

  const bestPerformingTag = Object.entries(reactionsPerTag).find(
    ([, count]) => count === Math.max(...Object.values(reactionsPerTag))
  )?.[0];

  const bestPerformingPost = posts?.find(
    (post) =>
      post.public_reactions_count ===
      Math.max(...posts.map((post) => post.public_reactions_count))
  );

  const mostControversialPost = posts?.find(
    (post) =>
      post.comments_count ===
      Math.max(...posts.map((post) => post.comments_count))
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
          className="rounded-full border border-gray-300 z-10 mt-14 shadow-sm"
        />
      </div>

      <h1 className="font-semibold text-lg text-gray-800">
        {user.name}&apos;s Year in Review
      </h1>

      <div className="grid grid-cols-2 gap-2 w-full text-sm text-gray-800">
        <div className="border border-gray-300 rounded-xl shadow-sm w-full p-4 bg-white">
          You published {postCount} posts! That&apos;s more than 99.99% of DEV
          users 🎉
        </div>
        <div className="border flex flex-col gap-2 border-gray-300 rounded-xl shadow-sm w-full p-4 bg-white">
          You got a total of {reactionsCount} reactions on your posts!
          <div className="flex flex-row">
            {reactionTypes.map((reaction, idx) => (
              <div
                key={reaction}
                className={clsx({
                  "rounded-full bg-gray-100 border-white border h-5 flex flex-col items-center justify-center w-5 z-10":
                    true,
                  "-ml-1.5": idx !== 0,
                })}
              >
                {reaction}
              </div>
            ))}
          </div>
        </div>

        <div className="border flex flex-col justify-between border-gray-300 rounded-xl shadow-sm w-full p-4 bg-white h-40">
          <span>
            Your busiest month was{" "}
            <span className="font-semibold text-green-500">{busiestMonth}</span>
          </span>
          <MonthsChart data={postsPerMonth} />
        </div>
        <div className="border border-gray-300 rounded-xl shadow-sm w-full p-4 bg-white">
          <p>You created {readingTime} minutes worth of content.</p>
          <p>
            Your fans spent{" "}
            <span className="font-semibold">
              ~
              {Math.round(
                totalEstimatedReadingTime > 60
                  ? totalEstimatedReadingTime / 60
                  : totalEstimatedReadingTime
              )}
            </span>{" "}
            {totalEstimatedReadingTime > 60 ? "hours" : "minutes"} reading your
            awesome posts!
          </p>
        </div>
        <div className="border border-gray-300 rounded-xl shadow-sm w-full p-4 bg-white">
          <span className="font-semibold">{commentsCount}</span> people felt
          compelled to comment on your posts! Pretty impressive.
        </div>
        <div className="border border-gray-300 rounded-xl shadow-sm w-full p-4 bg-white">
          {favoriteTag === bestPerformingTag ? (
            <>
              Your favorite and best performing tag was
              <a
                className="underline underline-offset-2 ml-1"
                rel="noopener noreferrer"
                target="_blank"
                href={`https://dev.to/t/${favoriteTag}`}
              >
                #{favoriteTag}
              </a>
              !
            </>
          ) : (
            <>
              Although your favorite tag was
              <a
                className="underline underline-offset-2 ml-1"
                rel="noopener noreferrer"
                target="_blank"
                href={`https://dev.to/t/${favoriteTag}`}
              >
                #{favoriteTag}
              </a>
              , your best performing tag was
              <a
                className="underline underline-offset-2 ml-1"
                href={`https://dev.to/t/${bestPerformingTag}`}
              >
                #{bestPerformingTag}
              </a>
              <span className="ml-1 text-base">👀</span>
            </>
          )}
        </div>

        <div className="border border-gray-300 rounded-xl shadow-sm w-full p-4 bg-white flex flex-col justify-between">
          Your fans really loved this post: <br />
          <a
            className="underline underline-offset-2"
            href={`https://dev.to${bestPerformingPost.path}`}
          >
            {bestPerformingPost.title}
          </a>
        </div>

        <div className="border border-gray-300 rounded-xl shadow-sm w-full p-4 bg-white flex flex-col gap-1">
          <a
            className="underline underline-offset-2"
            href={`https://dev.to${mostControversialPost.path}`}
          >
            {mostControversialPost.title}
          </a>{" "}
          really got people talking! It&apos;s your most commented post.
        </div>

        <div className="border border-gray-300 rounded-xl shadow-sm w-full p-4 bg-white">
          <span className="font-semibold">{mentionsCount}</span> people
          mentioned you in their comments. You&apos;re basically famous now 🤩
        </div>

        <div className="border border-gray-300 rounded-xl shadow-sm w-full p-4 bg-white flex flex-col gap-2">
          Want to check out your own stats?
          <UsernameForm />
        </div>
      </div>
    </div>
  );
}
