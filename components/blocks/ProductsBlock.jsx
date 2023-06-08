// ./components/blocks/ProductsBlock.jsx

import Image from "next/image";
import Link from "next/link";
import ProductCard from "../ProductCard";

const ProductsBlock = ({ products }) => {
  return (
    <ul className="products-block">
      {products?.length > 0 &&
        products.map((product) => (
          <li key={product.meta.id}>
            <ProductCard product={product} />
          </li>
        ))}
    </ul>
  );
};

export default ProductsBlock;
