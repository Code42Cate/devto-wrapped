import { Article, getArticleCoverImage, getPosts } from "./api";

export async function getStats(userId: string) {
  const posts = await getPosts(userId);

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

  const bestPostCoverImage = await getArticleCoverImage(bestPerformingPost?.id);
  const controversialCoverImage = await getArticleCoverImage(
    mostControversialPost?.id,
  );

  return {
    postCount,
    reactionsCount,
    reactionsPerTag,
    commentsCount,
    readingTime,
    totalEstimatedReadingTime,
    postsPerTag,
    postsPerMonth,
    busiestMonth,
    favoriteTag,
    bestPerformingTag,
    bestPerformingPost,
    mostControversialPost,
    bestPostCoverImage,
    controversialCoverImage,
  };
}
