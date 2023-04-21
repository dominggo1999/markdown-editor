import React, { memo } from "react";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

import { Checkbox } from "../Checkbox";

export interface PreviewMarkdownProps {
  children: string;
  className?: string;
}

const PreviewMarkdown: React.FC<PreviewMarkdownProps> = ({
  children,
  className,
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
            return (
              <li {...props} className={clsx(className, "flex gap-x-3")}>
                <Checkbox isSelected={checked}>{liChildren.slice(1)}</Checkbox>
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

export default memo(PreviewMarkdown);
