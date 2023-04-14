import Image from "next/image";
import Link from "next/link";

const BlogPageCard = ({ blogPage }) => {
  return (
    <article className="blog-page-card">
      <div className="wrapper ">
        <h2 className="blog-page-card__title">{blogPage.fields.title}</h2>
        <figure className="blog-page-card__image img-cont">
          <Image
            src={blogPage.fields.blog_seo.og_image}
            width={300}
            height={300}
            alt={blogPage.fields.blog_seo.og_image_alt}
          />
        </figure>
        <div className="blog-page-card__content">
          <p className="blog-page-card__date">
            {new Date(blogPage.fields.publish_date).toLocaleDateString()}
          </p>
          <p className="blog-page-card__description">
            {blogPage.fields.blog_seo.description}
          </p>
        </div>
      </div>
      <Link href={`/blog/${blogPage.slug}`} className="blog-page-card__link">
        Read More
      </Link>
    </article>
  );
};

export default BlogPageCard;
