// ./components/blocks/ProductsBlock.jsx

import Image from "next/image";
import Link from "next/link";

const ProductsBlock = ({ products }) => {
  return (
    <ul className="products-block">
      {products?.length > 0 &&
        products.map((product) => (
          <li key={product.meta.id}>
            <article className="product-card">
              <figure className="product-card__img-cont img-cont">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                />
              </figure>
              <h3 className="text-lg">{product.name}</h3>
              <p>{product.description}</p>
              <Link href={`/products/${product.product.slug}`} className="pt-4">
                View product
              </Link>
            </article>
          </li>
        ))}
    </ul>
  );
};

export default ProductsBlock;
