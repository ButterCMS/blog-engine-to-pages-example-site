import Head from "next/head";
import Image from "next/image";
import { getProductPage } from "@/lib/api";
import CTABlock from "@/components/blocks/CTABlock";
import ContentBlock from "@/components/blocks/ContentBlock";
import ProductsBlock from "@/components/blocks/ProductsBlock";
import ReadMoreBlock from "@/components/blocks/ReadMoreBlock";
import Link from "next/link";

export const getServerSideProps = async ({ params: { slug } }) => {
  try {
    const productPage = await getProductPage(slug);

    return {
      props: {
        productPage: productPage,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        productPage: null,
      },
    };
  }
};

const ProductPage = ({ productPage }) => {
  console.log({
    productPage,
  });
  if (!productPage) {
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
      <main className="article site-main">
        <header className="article-hero site-hero site-section !pb-12 my-12 border-b border-slate-800">
          <div className="wrapper flex flex-col gap-4 ">
            <h1 className="article-hero__title text-5xl mb-4">
              {productPage.fields.name}
            </h1>
            <figure className="img-cont h-96">
              <Image
                src={productPage.fields.image}
                width={800}
                height={400}
                className="w-full h-full object-cover"
                alt={productPage.fields.name}
              />
            </figure>
            <p>{productPage.fields.description}</p>
            <span className="text-2xl">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(productPage.fields.price)}
            </span>
          </div>
        </header>
        <section className="site-section">
          <div className="wrapper">
            <header className="section-header">
              <h2>Specifications</h2>
            </header>
            <ul className="specifications-list">
              {productPage.fields.specifications.length > 0 &&
                productPage.fields.specifications.map((spec, i) => {
                  return (
                    <li key={i} className="specifications-list__item">
                      <h3>{spec.name}</h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: spec.value,
                        }}
                      ></p>
                    </li>
                  );
                })}
            </ul>
          </div>
        </section>
        <section className="site-section">
          <div className="wrapper">
            <header className="section-header">
              <h2>Features</h2>
            </header>
            <ul className="features-list">
              {productPage.fields.features.length > 0 &&
                productPage.fields.features.map((feature, i) => {
                  return (
                    <li key={i} className="features-list__item">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: feature.value,
                        }}
                      ></p>
                    </li>
                  );
                })}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProductPage;
