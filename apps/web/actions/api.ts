export type Article = {
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

export type User = {
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

export async function getPosts(
  userId: string,
  page = 0,
): Promise<Article[] | undefined> {
  const res = await fetch(
    `https://dev.to/search/feed_content?per_page=100&page=${page}&user_id=${userId}&class_name=Article&sort_by=published_at&sort_direction=desc&approved=`,
  );
  if (!res.ok) {
    return undefined;
  }

  const data = await res.json();

  // filter by year
  const posts = data.result.filter(
    (post: Article) => post.published_at_int >= 1672531200,
  );

  if (data.result.length === 100) {
    return [...posts, ...(await getPosts(userId, page + 1))];
  }

  return posts;
}

export async function getMentionedCommentCount(username: string) {
  const res = await fetch(
    `https://dev.to/search/feed_content?per_page=60&page=0&class_name=Comment&search_fields=${username}`,
  );

  if (!res.ok) {
    return undefined;
  }

  const data = await res.json();

  return data.result.length as number;
}

export async function getUserdata(username: string): Promise<User | undefined> {
  const res = await fetch(
    `https://dev.to/api/users/by_username?url=${username}`,
  );
  if (!res.ok) {
    return undefined;
  }

  const data = await res.json();

  return data as User;
}
