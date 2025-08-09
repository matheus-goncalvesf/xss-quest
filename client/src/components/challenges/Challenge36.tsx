import React, { useState } from 'react';
import { ChallengeLayout } from '../ChallengeLayout';

const Challenge36: React.FC = () => {
  const [markdown, setMarkdown] = useState('');
  const [preview, setPreview] = useState('');

  const handleMarkdownChange = (value: string) => {
    setMarkdown(value);
    // Simular conversão Markdown para HTML (vulnerável)
    const html = value
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');
    setPreview(html);
  };

  return (
    <ChallengeLayout challengeId={36}>
      <div className="space-y-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">📝 Markdown Editor</h2>
          <p className="text-muted-foreground mb-4">
            Escreva texto em Markdown e veja a conversão automática para HTML.
            Suporte completo para links, formatação e HTML inline.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Markdown Input:</label>
              <textarea
                value={markdown}
                onChange={(e) => handleMarkdownChange(e.target.value)}
                className="w-full h-40 p-3 border rounded-md font-mono text-sm"
                placeholder="Digite seu Markdown aqui...
Exemplo: [Link](http://example.com)
**Negrito** e *itálico*"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Preview HTML:</label>
              <div 
                className="w-full h-40 p-3 border rounded-md bg-muted overflow-auto"
                dangerouslySetInnerHTML={{ __html: preview }}
              />
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-warning/10 border border-warning/30 rounded">
            <p className="text-sm text-warning">
              💡 <strong>Dica:</strong> Markdown permite HTML inline. Links com protocolos especiais podem ser interessantes...
            </p>
          </div>
        </div>
      </div>
    </ChallengeLayout>
  );
};

export default Challenge36;