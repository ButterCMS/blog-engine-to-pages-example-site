// ./components/blocks/ContentBlock.jsx

const ContentBlock = ({ content }) => {
  return (
    <div
      className="content-block"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
};

export default ContentBlock;
