import BlogPageCard from "@/components/BlogPageCard";
import {
  getAllCustomBlogPages,
  getCollectionBySlug,
  getCustomBlogPagesByTag,
} from "@/lib/api";

// function to get all custom blog pages server side
export const getServerSideProps = async ({ params }) => {
  try {
    const blogPages = await getCustomBlogPagesByTag(params.slug);
    const tag = await getCollectionBySlug("blog_tag", params.slug);

    return {
      props: {
        blogPages,
        slug: params.slug,
        tag: tag.data.blog_tag[0],
      },
    };
  } catch (error) {
    console.log({ error });
    return {
      props: {
        blogPages: null,
        slug: params.slug,
        tag: null,
      },
    };
  }
};

export default function TagArticles({ blogPages, tag, slug }) {
  return (
    <main className="site-main">
      <header className="site-hero site-section">
        <div className="wrapper py-32">
          <h1 className="text-3xl">Tag: {tag.name}</h1>
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
                    Browse through all of our blog posts with the tag "
                    {tag.name}"
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
  );
}
