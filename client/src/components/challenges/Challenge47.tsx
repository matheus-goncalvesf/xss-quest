import React, { useState, useRef } from 'react';
import { ChallengeLayout } from '../ChallengeLayout';

const Challenge47: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewContent, setPreviewContent] = useState('');
  const [metadata, setMetadata] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setMetadata({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: new Date(file.lastModified).toLocaleString()
    });

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      
      // Simular diferentes tipos de arquivo
      if (file.type.startsWith('image/')) {
        setPreviewContent(`<img src="${content}" style="max-width: 100%; height: auto;" alt="Preview" />`);
      } else if (file.type === 'text/html' || file.name.endsWith('.html')) {
        // VULNERABILIDADE: Renderizar HTML diretamente
        setPreviewContent(content);
      } else if (file.type.startsWith('text/') || file.name.endsWith('.svg')) {
        // SVG também pode conter JavaScript
        setPreviewContent(`<pre>${content}</pre>`);
        if (file.name.endsWith('.svg')) {
          setPreviewContent(content); // Renderizar SVG diretamente
        }
      } else {
        setPreviewContent(`<p>Arquivo binário (${file.type})</p><p>Tamanho: ${file.size} bytes</p>`);
      }
    };

    if (file.type.startsWith('image/')) {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
  };

  const sampleFiles = [
    {
      name: 'exemplo.html',
      content: '<h1>Título</h1><p>Parágrafo normal</p>'
    },
    {
      name: 'malicioso.html',
      content: '<h1>Arquivo HTML</h1><script>alert("XSS via upload!")</script><p>Conteúdo</p>'
    },
    {
      name: 'imagem.svg',
      content: '<svg width="100" height="100"><circle cx="50" cy="50" r="40" fill="red"/><script>alert("SVG XSS")</script></svg>'
    }
  ];

  const createSampleFile = (sample: any) => {
    const blob = new Blob([sample.content], { type: sample.name.endsWith('.svg') ? 'image/svg+xml' : 'text/html' });
    const file = new File([blob], sample.name, { type: blob.type });
    
    // Simular seleção do arquivo
    const event = {
      target: {
        files: [file]
      }
    } as any;
    handleFileSelect(event);
  };

  return (
    <ChallengeLayout challengeId={47}>
      <div className="space-y-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">📁 File Upload & Preview</h2>
          <p className="text-muted-foreground mb-4">
            Sistema de upload que permite visualizar diversos tipos de arquivo.
            Suporte para HTML, SVG, imagens e documentos de texto.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Selecionar arquivo:</label>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                className="w-full p-3 border rounded-md"
                accept=".html,.svg,.txt,.jpg,.png,.gif"
              />
            </div>
            
            <div>
              <h3 className="font-medium mb-2">📋 Arquivos de exemplo:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {sampleFiles.map((sample, index) => (
                  <button
                    key={index}
                    onClick={() => createSampleFile(sample)}
                    className="p-3 bg-accent/10 border border-accent/30 rounded hover:bg-accent/20 text-left"
                  >
                    <div className="font-medium text-sm">{sample.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {sample.content.substring(0, 50)}...
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {metadata && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">📊 Metadados do Arquivo:</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted rounded">
                      <div className="text-sm"><strong>Nome:</strong> {metadata.name}</div>
                      <div className="text-sm"><strong>Tipo:</strong> {metadata.type}</div>
                      <div className="text-sm"><strong>Tamanho:</strong> {metadata.size} bytes</div>
                      <div className="text-sm"><strong>Modificado:</strong> {metadata.lastModified}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">👁️ Preview do Arquivo:</h3>
                  <div 
                    className="p-3 border rounded-md bg-background min-h-32 max-h-60 overflow-auto"
                    dangerouslySetInnerHTML={{ __html: previewContent }}
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6 p-3 bg-warning/10 border border-warning/30 rounded">
            <p className="text-sm text-warning">
              ⚠️ <strong>Cuidado:</strong> Arquivos HTML e SVG são renderizados diretamente no navegador!
            </p>
          </div>
        </div>
      </div>
    </ChallengeLayout>
  );
};

export default Challenge47;