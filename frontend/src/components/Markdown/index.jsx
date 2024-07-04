import ReactMarkdown from "react-markdown";
import rehypePrism from "rehype-prism-plus";
// import '../../prism-custom.css';
import "prismjs/themes/prism-tomorrow.css";

const Markdown = ({ content }) => {
	return <ReactMarkdown rehypePlugins={[rehypePrism]} children={content} />;
};

export default Markdown;
