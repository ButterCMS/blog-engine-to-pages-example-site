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
  const resp = await butter.page.retrieve("blog_page", slug, {
    levels: 3,
  });
  return resp.data.data;
};

// function to filter custom blog pages by tag field
export const getCustomBlogPagesByTag = async (slug) => {
  const resp = await butter.page.list("blog_page", {
    "fields.tags.slug": slug,
  });

  return resp.data;
};

// function to filter custom blog pages by author field
export const getCustomBlogPagesByAuthor = async (slug) => {
  const resp = await butter.page.list("blog_page", {
    "fields.author.slug": slug,
  });

  return resp.data;
};

// function to get collection by slug
export const getCollectionBySlug = async (type, slug) => {
  const resp = await butter.content.retrieve([type], {
    "fields.slug": slug,
  });

  return resp.data;
};

// function to get a Product page
export const getProductPage = async (slug) => {
  const resp = await butter.page.retrieve("product", slug);

  return resp.data.data;
};
