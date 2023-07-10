import Head from "next/head";
import Image from "next/image";
import { getCustomBlogPage } from "@/lib/api";
import CTABlock from "@/components/blocks/CTABlock";
import ContentBlock from "@/components/blocks/ContentBlock";
import ProductsBlock from "@/components/blocks/ProductsBlock";
import ReadMoreBlock from "@/components/blocks/ReadMoreBlock";
import Link from "next/link";

export const getServerSideProps = async ({ params: { slug } }) => {
  try {
    const blogPage = await getCustomBlogPage(slug);

    return {
      props: {
        blogPage: blogPage,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        blogPage: null,
      },
    };
  }
};

const BlogPage = ({ blogPage }) => {
  console.log({
    blogPage,
  });
  if (!blogPage) {
    return (
      <>
        <Head>
          <title>Page not found</title>
        </Head>
        <main className="site-main">
          <header className="site-hero site-section">
            <div className="wrapper py-32">
              <h1 className="text-3xl">Page not found</h1>
              <p>
                Something is probably wrong with the link you clicked. Please
                try again.
              </p>
            </div>
          </header>
        </main>
      </>
    );
  }

  return (
    <>
      {/* Page meta */}
      <Head>
        <title>{blogPage.fields.blog_seo.title}</title>
        <meta
          name="description"
          content={blogPage.fields.blog_seo.desscription}
        />
        <meta name="author" content={blogPage.fields.author.name} />
        {/* og meta */}
        <meta property="og:title" content={blogPage.fields.blog_seo.title} />
        <meta
          property="og:description"
          content={blogPage.fields.blog_seo.description}
        />
        <meta property="og:image" content={blogPage.fields.blog_seo.og_image} />
        <meta
          property="og:image:alt"
          content={blogPage.fields.blog_seo.og_image_alt}
        />
        <meta property="og:type" content="website" />
        {/* twitter meta */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@buttercms" />
        <meta name="twitter:creator" content="@buttercms" />
        <meta name="twitter:title" content={blogPage.fields.blog_seo.title} />
        <meta
          name="twitter:description"
          content={blogPage.fields.blog_seo.description}
        />
        <meta
          name="twitter:image"
          content={blogPage.fields.blog_seo.og_image}
        />
        <meta
          name="twitter:image:alt"
          content={blogPage.fields.blog_seo.og_image_alt}
        />
      </Head>
      <main className="article site-main">
        <header className="article-hero site-hero site-section !pb-12 border-b border-slate-800">
          <div className="wrapper flex flex-col gap-4 ">
            <h1 className="article-hero__title text-5xl mb-4">
              {blogPage.fields.title}
            </h1>
            <figure className="img-cont h-96">
              <Image
                src={blogPage.fields.blog_seo.og_image}
                width={800}
                height={400}
                className="w-full h-full object-cover"
                alt={blogPage.fields.blog_seo.og_image_alt}
              />
            </figure>
            <ul className="article-hero__tag-list">
              {blogPage.fields?.tags?.length > 0 &&
                blogPage.fields?.tags.map((tag) => (
                  <li key={tag.meta?.id} className="article-hero__tag-item">
                    <Link href={`/blog/tags?tags=${tag.slug}`}>{tag.name}</Link>
                  </li>
                ))}
            </ul>
            <p>{blogPage.fields.summary}</p>
            <time dateTime={blogPage.fields.publish_date}>
              {new Date(blogPage.fields.publish_date).toLocaleDateString()}
            </time>
            <div className="flex flex-wrap gap-4">
              <address>
                <Link href={`/blog/author/${blogPage.fields.author.slug}`}>
                  <p>By {blogPage.fields.author.name}</p>
                </Link>
              </address>
              <p>
                In{" "}
                <Link
                  href={`/blog/category/${blogPage.fields.categories[0].slug}`}
                >
                  {blogPage.fields.categories[0].name}
                </Link>
              </p>
            </div>
          </div>
        </header>
        <section className="site-section">
          <div className="wrapper">
            <div className="article-body">
              {blogPage.fields.body.map(({ type, fields }, i) => {
                switch (type) {
                  case "content_block":
                    return <ContentBlock key={i} content={fields.content} />;

                  case "products_block":
                    return <ProductsBlock key={i} products={fields.products} />;

                  case "cta_block":
                    return <CTABlock key={i} fields={fields} />;

                  case "read_more_block":
                    return <ReadMoreBlock key={i} pages={fields.posts} />;

                  default:
                    return <div>Unknown type: {type}</div>;
                }
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default BlogPage;
