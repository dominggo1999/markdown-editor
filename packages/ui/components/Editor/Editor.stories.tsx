import React, { useState } from "react";

import Editor from "./Editor";

export const Default = () => {
  const [doc, setDoc] = useState<string>("# Hello, World!\n");

  return (
    <div>
      <Editor setEditorContent={setDoc} initialContent={doc} />
    </div>
  );
};
