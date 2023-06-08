import BlogPageCard from "@/components/BlogPageCard";
import {
  getCollectionBySlug,
  getCustomBlogPagesByCollectionSlug,
} from "@/lib/api";
import Head from "next/head";

// function to get all custom blog pages server side
export const getServerSideProps = async ({ params }) => {
  try {
    const blogPages = await getCustomBlogPagesByCollectionSlug(
      params.slug,
      "categories"
    );
    const category = await getCollectionBySlug("blog_category", params.slug);

    return {
      props: {
        blogPages,
        slug: params.slug,
        category: category.data.blog_category[0],
      },
    };
  } catch (error) {
    console.log({ error });
    return {
      props: {
        blogPages: null,
        slug: params.slug,
        category: null,
      },
    };
  }
};

export default function CategoryArticles({ blogPages, category, slug }) {
  return (
    <>
      <Head>
        <title>Category: {category.name}</title>
        <meta
          name="description"
          content={`Browse through all of our blog posts in the ${category.name} category`}
        />
      </Head>
      <main className="site-main">
        <header className="site-hero site-section">
          <div className="wrapper">
            <h1 className="text-3xl">Category: {category.name}</h1>
          </div>
        </header>
        <section className="site-section blog-pages-section">
          <div className="wrapper">
            {blogPages ? (
              <>
                <header className="section-header">
                  <div className="wrapper">
                    <h2>Popular results</h2>
                    <p>
                      Browse through all of our blog posts in the{" "}
                      {category.name} category
                    </p>
                  </div>
                </header>
                <ul className="pages-list">
                  {blogPages.data.map((blogPage) => (
                    <li key={blogPage.slug} className="list-item">
                      <BlogPageCard blogPage={blogPage} />
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="opacity-20">
                <p>Something might be wrong. There are no blog pages.</p>
                <span>Try refreshing the page.</span>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
