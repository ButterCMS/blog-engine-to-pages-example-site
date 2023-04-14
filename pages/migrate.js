import { getAllBlogPosts, getAllCustomBlogPages } from "@/lib/api";
import { useEffect, useState } from "react";

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  try {
    const posts = await getAllBlogPosts();
    const blogPages = await getAllCustomBlogPages();

    return {
      props: {
        posts,
        blogPages,
        error: null,
      },
    };
  } catch (error) {
    console.log({
      error,
    });
    return {
      props: {
        error: "Error fetching posts",
        posts: null,
        blogPages: null,
      },
    };
  }
};

const Migrate = ({ error, posts, blogPages }) => {
  const [isMigrating, setIsMigrating] = useState(false);
  const [isMigrationComplete, setIsMigrationComplete] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [migratedPosts, setMigratedPosts] = useState([]);
  const [migrateError, setMigrateError] = useState(null);

  const createCollections = async (collections) => {
    const res = await fetch("/api/createCollections", {
      method: "POST",
      body: JSON.stringify(collections),
    });
    const resData = await res.json();
    return resData;
  };

  const createBlogPage = async (pageData) => {
    const res = await fetch("/api/createBlogPage", {
      method: "POST",
      body: JSON.stringify(pageData),
    });
    const resData = await res.json();
    return resData;
  };

  const handleMigrate = async () => {
    setIsMigrating(true);
    await Promise.all(
      posts.data.map(async (post) => {
        console.log({
          post,
        });

        const authorData = {
          name: `${post?.author?.first_name} ${post?.author?.last_name}`,
          slug: post?.author?.slug,
          description: post?.author?.bio,
        };

        const categoriesData = post?.categories.map((category) => {
          return {
            name: category?.name,
            slug: category?.slug,
          };
        });

        const tagsData = post?.tags.map((tag) => {
          return {
            name: tag?.name,
            slug: tag?.slug,
          };
        });

        setCurrentMessage(`Creating collections for ${post?.title}`);
        const createdCollections = await createCollections([
          {
            data: categoriesData,
            type: "category",
          },
          {
            data: tagsData,
            type: "tag",
          },
          {
            data: [authorData],
            type: "author",
          },
        ]);
        setCurrentMessage(`Collections created for ${post?.title}`);

        const categoriesID = createdCollections
          .find((collection) => collection.key === "blog_category")
          .data.map((c) => c.meta.id);
        const tagsID = createdCollections
          .find((collection) => collection.key === "blog_tag")
          .data.map((c) => c.meta.id);
        const authorID = createdCollections.find(
          (collection) => collection.key === "blog_author"
        ).data[0].meta.id;

        console.log({
          createdCollections,
          categoriesID,
          tagsID,
          authorID,
        });

        const pageData = {
          "page-type": "blog_page",
          status: "published",
          title: post?.title,
          slug: post?.slug,
          fields: {
            blog_seo: {
              title: post?.seo_title,
              description: post?.meta_description,
              og_image: post?.featured_image,
              og_image_alt: post?.featured_image_alt,
            },
            title: post?.title,
            body: [
              {
                content_block: {
                  content: post?.body,
                },
              },
            ],
            categories: categoriesID,
            tags: tagsID,
            author: authorID,
            summary: post?.summary,
            publish_date: post?.published,
          },
        };

        try {
          setCurrentMessage(`Creating page for ${post?.title}`);
          const createdPage = await createBlogPage(pageData);

          if (!createdPage?.status) throw new Error("Page already exists");

          console.log({
            createdPage,
          });
          setCurrentMessage(`Page created for ${post?.title}`);
          setMigratedPosts((prev) => [...prev, pageData]);
        } catch (error) {
          setCurrentMessage(
            `Error creating page for ${post?.title} - ${error.message}`
          );
          setMigrateError((prev) => ({
            ...prev,
            [post?.slug]: error.message,
          }));
          console.log({
            error,
          });
        }

        console.log({
          pageData,
        });

        console.log({
          authorData,
          categoriesData,
          tagsData,
        });
      })
    );
    setTimeout(() => {
      setCurrentMessage("Migration complete");
    }, 2000);

    setIsMigrating(false);
    setIsMigrationComplete(true);
  };

  useEffect(() => {
    setTimeout(() => {
      !isMigrating &&
        migrateError &&
        setCurrentMessage("Migration failed or incomplete");
    }, 2000);
  }, [isMigrating, migrateError]);

  return (
    <>
      <main>
        <header className="p-6">
          <h1>All Posts</h1>
        </header>

        <section className="p-6">
          <div className="wrapper grid grid-cols-2 gap-4">
            <section className="posts">
              <header className="mb-4">
                <h2>ButterCMS Blog posts</h2>
              </header>
              {!error && (
                <ul className="flex flex-col gap-2">
                  {posts.data.map((post) => (
                    <li key={post?.slug}>
                      <h2 className="text-2xl">{post?.title}</h2>
                      <code>{post?.slug}</code>
                    </li>
                  ))}
                </ul>
              )}
            </section>
            <section className="blog-pages">
              <header className="mb-4">
                <h2>Custom Blog Pages</h2>
              </header>
              {!error && (
                <ul className="flex flex-col gap-2">
                  {blogPages.data.map((page) => (
                    <li key={page?.slug}>
                      <h2 className="text-2xl">{page?.fields.title}</h2>
                      <code>{page?.slug}</code>
                    </li>
                  ))}
                  {migratedPosts.length > 0 &&
                    migratedPosts.map((page) => (
                      <li key={page?.slug} className="text-green-600">
                        <h2 className="text-2xl">{page?.fields.title}</h2>
                        <code>{page?.slug}</code>
                      </li>
                    ))}
                </ul>
              )}
            </section>
          </div>
        </section>
        <section className="p-6">
          <header className="mb-4">
            <h2>Migrated Posts</h2>
          </header>
          <div>
            {migratedPosts.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {migratedPosts.map((post) => (
                  <li key={post.slug}>
                    <code>{post.slug}</code>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No posts migrated yet</p>
            )}
          </div>
        </section>
        <div className="p-6">
          <p className="mb-4 text-purple-600">{currentMessage}</p>
          {migrateError && (
            <ul className="flex flex-col gap-2">
              {Object.keys(migrateError).map((key) => (
                <li key={key}>
                  <code>{key}</code>
                  <p>{migrateError[key]}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="action-cont p-6">
          <button
            onClick={handleMigrate}
            disabled={isMigrating}
            className="cta p-3 px-5 border border-white/20 rounded-lg disabled:opacity-20"
          >
            Migrate
          </button>
        </div>
        {/* <section>
          <header>
            <h2>
              API Keys
            </h2>
          </header>
          <div className="form-control">
            <label htmlFor="read">Read API Key</label>
            <input value={} type="text" />
          </div>
          <div className="form-control">
            <label htmlFor="read">Write API Key</label>
            <input value={} type="text" />
          </div>
          
        </section> */}
      </main>
    </>
  );
};

export default Migrate;
