import BlogPageCard from "@/components/BlogPageCard";
import { getAllCustomBlogPages } from "@/lib/api";
import Head from "next/head";

// function to get all custom blog pages server side
export const getServerSideProps = async () => {
  try {
    const blogPages = await getAllCustomBlogPages();

    return {
      props: {
        blogPages,
      },
    };
  } catch (error) {
    console.log({ error });
    return {
      props: {
        blogPages: null,
      },
    };
  }
};

export default function Home({ blogPages }) {
  return (
    <>
    <Head>
      <title>LuminaClick - Home</title>
      <meta name="description" content="LuminaClick - Home" />
    </Head>
    <main className="site-main">
      <header className="site-hero site-section">
        <div className="wrapper py-32">
          <h1 className="text-3xl">Welcome to LuminaClick</h1>
          <p>
            Your go-to destination for high-quality computer mice that offer
            precision and speed.
          </p>
        </div>
      </header>
      <section className="site-section blog-pages-section">
        <div className="wrapper">
          {blogPages ? (
            <>
              <header className="section-header">
                <div className="wrapper">
                  <h2>All blog pages</h2>
                  <p>Browse through all of our blog posts.</p>
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
