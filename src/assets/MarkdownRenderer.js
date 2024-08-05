import React from 'react';
import { marked } from 'marked';

export const MarkdownRenderer = ({ markdownText }) => {
  // Converte Markdown para HTML
  const htmlContent = marked(markdownText);

  return (
    <div
      // Renderiza o HTML gerado com dangerouslySetInnerHTML
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

