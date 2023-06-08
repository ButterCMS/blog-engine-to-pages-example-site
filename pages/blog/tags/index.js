import BlogPageCard from "@/components/BlogPageCard";
import { getCustomBlogPagesByCollectionSlug } from "@/lib/api";
import Head from "next/head";

// function to get all custom blog pages server side
export const getServerSideProps = async ({ params, query }) => {
  try {
    const tags = query?.tags;

    const blogPages = await getCustomBlogPagesByCollectionSlug(tags);

    console.log({ blogPages });

    return {
      props: {
        tags,
        blogPages,
      },
    };
  } catch (error) {
    console.log({ error });
    return {
      props: {
        tags: null,
        blogPages: null,
      },
    };
  }
};

export default function TagsArticles({ tags, blogPages }) {
  return (
    <>
      <Head>
        <title>Tags: {tags.split(",").join(", ")}</title>
        <meta
          name="description"
          content={`Browse through all of our blog posts tagged with ${tags
            .split(",")
            .join(", ")}`}
        />
      </Head>
      <main className="site-main">
        <header className="site-hero site-section">
          <div className="wrapper">
            <h1 className="text-3xl">Tags: {tags.split(",").join(", ")}</h1>
          </div>
        </header>
        <section className="site-section blog-pages-section">
          <div className="wrapper">
            {blogPages ? (
              <>
                <header className="section-header">
                  <div className="wrapper">
                    <h2>Popular results</h2>
                    <p>Browse through all of our blog posts</p>
                  </div>
                </header>
                {blogPages.data.length > 0 ? (
                  <ul className="pages-list">
                    {blogPages.data.map((blogPage) => (
                      <li key={blogPage.slug} className="list-item">
                        <BlogPageCard blogPage={blogPage} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="opacity-20">
                    <p>
                      Something might be wrong. There are no blog pages for the
                      current tags
                    </p>
                  </div>
                )}
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
