import React from "react";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { bracketMatching } from "@codemirror/language";
import { languages } from "@codemirror/language-data";
import { EditorView } from "@codemirror/view";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror from "@uiw/react-codemirror";

export const themeOverwrite = EditorView.theme({
  ".cm-activeLine": {
    backgroundColor: "transparent!important",
  },
  ".cm-gutterElement.cm-activeLineGutter": {
    backgroundColor: "transparent!important",
    color: "#f15998",
  },
});

export interface EditorProps {
  onChange: (doc: string) => void;
  value: string;
  className?: string;
}

const Editor: React.FC<EditorProps> = ({ onChange, value, className }) => {
  return (
    <CodeMirror
      className={className}
      value={value}
      extensions={[
        bracketMatching(),
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: true,
        }),
        themeOverwrite,
        EditorView.lineWrapping,
      ]}
      height="100%"
      theme={vscodeDark}
      onChange={onChange}
    />
  );
};

export default Editor;
