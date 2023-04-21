import React, { useCallback, useState } from "react";

import "./stories.css";
import { Editor } from "../Editor";
import PreviewMarkdown from "./PreviewMarkdown";

export const Default = () => {
  const [doc, setDoc] = useState<string>("# Hello, World!\n");

  const handleDocChange = useCallback((newDoc: string) => {
    setDoc(newDoc);
  }, []);

  return (
    <div className="grid grid-cols-2 items-start gap-x-3">
      <Editor onChange={handleDocChange} value={doc} />
      <div>
        <PreviewMarkdown updateMarkdown={(newVal) => setDoc(newVal)}>
          {doc}
        </PreviewMarkdown>
      </div>
    </div>
  );
};
