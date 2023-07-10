// ./components/blocks/ReadMoreBlock.jsx

import BlogPageCard from "../BlogPageCard";

const ReadMoreBlock = ({ pages }) => {
  return (
    <article className="read-more-block">
      <header className="read-more-block__header">
        <h2>Read more</h2>
      </header>
      <ul className="read-more-block__list">
        {pages.map((page) => (
          <li key={page.slug}>
            <BlogPageCard blogPage={page} />
          </li>
        ))}
      </ul>
    </article>
  );
};

export default ReadMoreBlock;
