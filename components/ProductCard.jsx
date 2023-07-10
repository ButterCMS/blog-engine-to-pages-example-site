const { default: Image } = require("next/image");
const { default: Link } = require("next/link");

const ProductCard = ({ product }) => {
  return (
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
      <Link
        href={`/products/${product?.slug || product?.product?.slug}`}
        className="pt-4"
      >
        View product
      </Link>
    </article>
  );
};

export default ProductCard;
