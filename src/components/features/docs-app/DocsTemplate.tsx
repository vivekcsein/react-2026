import Markdown from "../../ui/markdown/Markdown";
import { useDocs } from "../../../packages/hooks/useDocs";
import Loading from "../../layouts/Loading";

interface Props {
  docsName: string;
}

const DocsTemplate = ({ docsName }: Props) => {
  const { markdown, loading, error } = useDocs(docsName);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;

  return <Markdown content={markdown} />;
};

export default DocsTemplate;
