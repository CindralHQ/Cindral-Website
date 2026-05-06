import { google } from "googleapis";

export type BloggerPost = {
  id: string;
  title: string;
  url: string;
  published: string;
  labels: string[];
  excerpt: string;
  content?: string;
};

type BloggerApiPost = {
  id?: string;
  title?: string;
  url?: string;
  published?: string;
  labels?: string[];
  content?: string;
};

export async function getBloggerPosts(limit = 6): Promise<{
  configured: boolean;
  posts: BloggerPost[];
  error?: string;
}> {
  const client = await createBloggerClient();

  if (!client.configured) {
    return { configured: false, posts: [] };
  }

  try {
    const response = await client.blogger.posts.list({
      blogId: client.blogId,
      fetchBodies: true,
      fields: "items(id,title,url,published,labels,content)",
      maxResults: limit,
      orderBy: "published",
    });
    const posts = (response.data.items ?? []) as BloggerApiPost[];

    return {
      configured: true,
      posts: posts.map((post) => normalizePost(post)),
    };
  } catch (error) {
    console.error("Blogger posts fetch failed", error);
    return {
      configured: true,
      posts: [],
      error: "Unable to reach Blogger right now.",
    };
  }
}

export async function getBloggerPost(postId: string): Promise<{
  configured: boolean;
  post?: BloggerPost;
  error?: string;
}> {
  const client = await createBloggerClient();

  if (!client.configured) {
    return { configured: false };
  }

  try {
    const response = await client.blogger.posts.get({
      blogId: client.blogId,
      postId,
      fetchBody: true,
      fields: "id,title,url,published,labels,content",
    });
    const post = response.data as BloggerApiPost;

    return {
      configured: true,
      post: normalizePost(post, true),
    };
  } catch (error) {
    console.error("Blogger post fetch failed", error);
    return {
      configured: true,
      error: "Unable to load this post right now.",
    };
  }
}

async function createBloggerClient(): Promise<
  | {
      configured: true;
      blogId: string;
      blogger: ReturnType<typeof google.blogger>;
    }
  | { configured: false }
> {
  const blogId = process.env.BLOGGER_BLOG_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!blogId || !clientEmail || !privateKey) {
    return { configured: false };
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/blogger.readonly"],
  });

  return {
    configured: true,
    blogId,
    blogger: google.blogger({ version: "v3", auth }),
  };
}

function normalizePost(post: BloggerApiPost, includeContent = false): BloggerPost {
  const content = sanitizeBloggerHtml(post.content ?? "");

  return {
    id: post.id ?? post.url ?? post.title ?? "post",
    title: post.title ?? "Untitled post",
    url: post.url ?? "#",
    published: post.published ?? "",
    labels: post.labels ?? [],
    excerpt: createExcerpt(post.content ?? ""),
    content: includeContent ? content : undefined,
  };
}

function sanitizeBloggerHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/\s(href|src)=["']javascript:[^"']*["']/gi, "")
    .trim();
}

function createExcerpt(html: string) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= 160) return text;

  return `${text.slice(0, 157).trim()}...`;
}
