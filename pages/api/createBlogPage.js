import { butter } from "@/lib/api";

const getBlogPage = async (slug) => {
  try {
    const resp = await butter.page.retrieve("blog_page", slug);
    return resp.data.data;
  } catch (error) {
    return null;
  }
};

const createBlogPage = async (data) => {
  const blogPage = await getBlogPage(data.slug);

  if (blogPage) {
    throw new Error("Blog page already exists");
  }

  const resp = await fetch("https://api.buttercms.com/v2/pages/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${process.env.BUTTERCMS_WRITE_TOKEN}`,
    },
    body: data,
  });

  return await resp.json();
};

export default async function handler(req, res) {
  try {
    const data = req.body;
    console.log({
      data,
    });

    const blogPage = await createBlogPage(data);

    res.status(200).json(blogPage);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
}
