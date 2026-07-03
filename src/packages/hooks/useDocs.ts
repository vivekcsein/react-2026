import { useEffect, useState } from "react";

const docs = import.meta.glob("/docs/**/*.md", {
  query: "?raw",
  import: "default",
});

interface UseDocsResult {
  markdown: string;
  loading: boolean;
  error: string | null;
}

export function useDocs(docsName: string): UseDocsResult {
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);

      const key = `/docs/${docsName}.md`;
      const loader = docs[key];

      if (!loader) {
        if (!cancelled) {
          setError(`Document not found: ${docsName}`);
          setMarkdown("");
          setLoading(false);
        }
        return;
      }

      try {
        const content = (await loader()) as string;
        if (!cancelled) setMarkdown(content);
      } catch {
        if (!cancelled) setError(`Failed to load document: ${docsName}`);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [docsName]);

  return { markdown, loading, error };
}
