import BlogPageCard from "@/components/BlogPageCard";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/api";
import Head from "next/head";

// function to get all custom blog pages server side
export const getServerSideProps = async () => {
  try {
    const productPages = await getAllProducts();

    return {
      props: {
        productPages,
      },
    };
  } catch (error) {
    console.log({ error });
    return {
      props: {
        productPages: null,
      },
    };
  }
};

export default function Products({ productPages }) {
  return (
    <>
      <Head>
        <title>Products</title>
        <meta
          name="description"
          content={`Browse through all of our products.`}
        />
      </Head>
      <main className="site-main">
        <header className="site-hero site-section">
          <div className="wrapper">
            <h1 className="text-3xl">LuminaClick Products</h1>
            <p>
              You've arrived at your go-to destination for high-quality computer
              mice that offer precision and speed.
            </p>
          </div>
        </header>
        <section className="site-section blog-pages-section">
          <div className="wrapper">
            {productPages ? (
              <>
                <header className="section-header">
                  <div className="wrapper">
                    <h2>All products</h2>
                    <p>Browse through all of our products.</p>
                  </div>
                </header>
                <ul className="pages-list">
                  {productPages.data.map((productPage) => (
                    <li key={productPage.slug} className="list-item">
                      <ProductCard
                        product={{
                          ...productPage.fields,
                          slug: productPage.slug,
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="opacity-20 max-w-5xl m-auto">
                <p>Something might be wrong. There are no products.</p>
                <span>Try refreshing the page.</span>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
