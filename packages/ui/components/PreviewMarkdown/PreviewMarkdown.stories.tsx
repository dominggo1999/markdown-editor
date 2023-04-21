import React, { useState } from "react";
import { useDebounce } from "use-debounce";

import "./stories.css";
import { Editor } from "../Editor";
import PreviewMarkdown from "./PreviewMarkdown";

export const Default = () => {
  const [doc, setDoc] = useState<string>("# Hello, World!\n");
  const [debouncedEditorContent] = useDebounce(doc, 500);

  return (
    <div className="grid grid-cols-2 items-start gap-x-3">
      <Editor setEditorContent={setDoc} initialContent={doc} />
      <div>
        <PreviewMarkdown>{debouncedEditorContent}</PreviewMarkdown>
      </div>
    </div>
  );
};
