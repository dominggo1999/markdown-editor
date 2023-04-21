import React, { type Dispatch, type SetStateAction } from "react";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

import { Checkbox } from "../Checkbox";

export interface PreviewMarkdownProps {
  children: string;
  className?: string;
  updateMarkdown: Dispatch<SetStateAction<string>>;
}

const generateCheckbox = (checked: boolean) => (checked ? "- [x]" : "- [ ]");

const PreviewMarkdown: React.FC<PreviewMarkdownProps> = ({
  children,
  className,
  updateMarkdown,
}) => {
  return (
    <ReactMarkdown
      className={clsx("", className)}
      remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              style={oneDark}
              language={match[1]}
              PreTag="div"
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
        li({ node, checked, children: liChildren, className, ...props }) {
          if (checked !== null && checked !== undefined) {
            const handleChange = () => {
              const lines = children.split("\n");
              const lineIndex = node.position?.start.line;

              if (typeof lineIndex === "number") {
                const newLineValue = lines[lineIndex - 1]?.replace(
                  generateCheckbox(checked),
                  generateCheckbox(!checked),
                );

                lines[lineIndex - 1] = newLineValue || "";

                updateMarkdown(lines.join("\n"));
              }
            };

            return (
              <li {...props} className={clsx(className, "flex gap-x-3")}>
                <Checkbox onChange={handleChange} isSelected={checked}>
                  {liChildren.slice(1)}
                </Checkbox>
              </li>
            );
          }

          return (
            <li {...props} className={className}>
              {liChildren}
            </li>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default PreviewMarkdown;
