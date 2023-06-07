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
        <ul className="blog-page-card__tag-list">
          {blogPage.fields?.tags?.length > 0 &&
            blogPage.fields?.tags.map((tag) => {
              return (
                <li key={tag.meta?.id} className="blog-page-card__tag-item">
                  <Link href={`/blog/tags/${tag.slug}`}>{tag.name}</Link>
                </li>
              );
            })}
        </ul>

        <div className="blog-page-card__content">
          <address>
            <Link href={`/blog/author/${blogPage.fields.author.slug}`}>
              <p>By {blogPage.fields.author.name}</p>
            </Link>
          </address>
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
