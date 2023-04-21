import React, { useCallback, useState } from "react";

import Editor from "./Editor";

export const Default = () => {
  const [doc, setDoc] = useState<string>("# Hello, World!\n");

  const handleDocChange = useCallback((newDoc: string) => {
    setDoc(newDoc);
  }, []);

  return (
    <div>
      <Editor onChange={handleDocChange} value={doc} />
    </div>
  );
};
