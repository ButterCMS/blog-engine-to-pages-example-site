// ./components/blocks/ProductsBlock.jsx

import Image from "next/image";
import Link from "next/link";

const ProductsBlock = ({ products }) => {
  return (
    <ul className="products-block">
      {products.map((product) => (
        <li key={product.slug}>
          <article className="product-card">
            <figure className="product-card__img-cont img-cont">
              <Image
                src={product.fields.image}
                alt={product.fields.name}
                width={400}
                height={400}
              />
            </figure>
            <h3 className="text-lg">{product.fields.name}</h3>
            <p>{product.fields.description}</p>
            <span className="text-2xl">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(product.fields.price)}
            </span>
            <Link href={`/products/${product.slug}`} className="pt-4">
              View product
            </Link>
          </article>
        </li>
      ))}
    </ul>
  );
};

export default ProductsBlock;
