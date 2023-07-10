import { getBlogPosts } from "@/lib/api";

export default async function handler(req, res) {
  try {
    const posts = await getBlogPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).end(error.message);
  }
}
