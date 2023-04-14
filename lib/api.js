// ./lib/api.js

import Butter from "buttercms";

// init butter
export const butter = Butter(process.env.BUTTERCMS_READ_TOKEN);

// function to get all blog posts
export const getBlogPosts = async (page = 1, pageSize = 1) => {
  const resp = await butter.post.list({ page, page_size: pageSize });
  return resp.data;
};

// function to get a single blog post
export const getAllBlogPosts = async () => {
  const resp = await butter.post.list();
  return resp.data;
};

// function to get all custom blog pages
export const getAllCustomBlogPages = async () => {
  const resp = await butter.page.list("blog_page");
  return resp.data;
};

// function to get a single custom blog page
export const getCustomBlogPage = async (slug) => {
  const resp = await butter.page.retrieve("blog_page", slug);
  return resp.data.data;
};
