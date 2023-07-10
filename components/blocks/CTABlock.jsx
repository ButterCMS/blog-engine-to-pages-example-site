// ./components/blocks/CTABlock.jsx

const { default: Link } = require("next/link");

const CTABlock = ({ fields }) => {
  return (
    <article className="cta-block">
      <header className="cta-block__header">
        <h2 className="cta-block__caption">{fields.caption}</h2>
        <p>{fields.text}</p>
      </header>

      <Link href={fields.link}>
        <button className="cta">Let's Go!</button>
      </Link>
    </article>
  );
};

export default CTABlock;
